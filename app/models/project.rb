# frozen_string_literal: true

class Project < ApplicationRecord
  has_many :members, dependent: :delete_all
  has_many :users, through: :members

  has_many :taggings, dependent: :delete_all
  has_many :tags, through: :taggings

  has_many :favorites, dependent: :destroy
  has_many :stars, through: :favorites, source: :user

  has_many :received_follows, as: :followable, class_name: 'Following'
  has_many :followers, through: :received_follows, source: :follower

  has_many :expertisings, as: :expertisable, dependent: :delete_all
  has_many :expertises, through: :expertisings, source: :expertise

  has_many :received_views, as: :viewable, class_name: 'Viewing', dependent: :delete_all
  has_many :viewers, through: :received_views, source: :viewer

  has_many :posts
  has_many :roles

  has_many :join_requests, dependent: :delete_all

  validates :title, presence: true, length: { within: 1..50 }
  validates :short_desc, presence: true, length: { within: 1..150 }
  validates :long_desc, length: { within: 0..250 }
  validate :start_date_greater_than_end_date
  validates_length_of :tag_list, minimum: 1, message: 'Tags cannot be blank.'
  validates_length_of :tag_list, maximum: 3, message: 'Tags can only have up to 3.'

  def start_date_greater_than_end_date
    return if [start_date.blank?, end_date.blank?].any?

    if start_date > end_date
      errors.add(:start_date, 'must happend before end date')
    end
  end

  def tag_list
    tags.join(' ').split(' ')
  end

  def tag_list=(tags_array)
    tag_names = tags_array.uniq[0..2]
    new_or_found_tags = tag_names.collect { |name| Tag.find_or_create_by(name: name) }
    self.tags = new_or_found_tags
  end

  def self.expertise_ids=(expertise_array)
    expertises.destroy_all
    expertise_array = expertise_array.uniq[0..2]
    expertise_array.each do |id|
      expertises << Expertise.find(id)
    end
  end

  def owners
    owner_members.collect(&:user)
  end

  def owner_members
    Member.where(project: self, is_owner: true)
  end

  def add_member(user, is_owner: false)
    Member.find_or_create_by(user: user, project: self, is_owner: is_owner)
  end

  def start_date_to_s
    return '-' if start_date.blank?

    start_date.strftime '%a %d %b %Y'
  end

  def end_date_to_s
    return '-' if end_date.blank?

    end_date.strftime '%a %d %b %Y'
  end

  def starred_by?(user)
    stars.include? user
  end

  def followed_by?(user)
    followers.include?(user)
  end

  def categories_tree
    tree = []
    expertises.each do |expertise|
      tree << expertise.parents_tree
    end
    tree
  end

  def get_n_latest_unique_viewed(n = 16)
    received_views.order('created_at DESC').map(&:viewer_id).uniq[0..(n - 1)]
  end
end
