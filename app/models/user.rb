# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  MAX_IMG_MB_SIZE = 5
  VALID_IMG_TYPES = %w[image/png image/jpg image/jpeg].freeze
  ROLE = %w[student professor].freeze

  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable, :validatable

  has_many :members
  has_many :projects, through: :members do
    def owned
      where('members.is_owner = ?', true)
    end

    def participated
      where('members.is_owner = ?', false)
    end
  end

  has_many :favorites, dependent: :destroy
  has_many :starring_projects, through: :favorites, source: :project

  has_many :received_follows, as: :followable, class_name: 'Following', dependent: :delete_all
  has_many :followers, through: :received_follows, source: :follower
  has_many :given_follows, dependent: :delete_all,
                           foreign_key: :follower_id, class_name: 'Following'
  has_many :followings, through: :given_follows, source: :followable, source_type: 'User'
  has_many :following_projects, through: :given_follows, source: :followable, source_type: 'Project'
  has_many :expertisings, as: :expertisable, dependent: :delete_all
  has_many :expertises, through: :expertisings, source: :expertise
  has_many :user_skills, dependent: :delete_all
  has_many :skills, through: :user_skills

  has_one_attached :profile_image

  validates :first_name, presence: true, length: { within: 1..50 }
  validates :last_name, presence: true, length: { within: 1..50 }
  validates :profile_image, content_type: VALID_IMG_TYPES,
                            size: { less_than: MAX_IMG_MB_SIZE.megabytes,
                                    message: "should less than #{MAX_IMG_MB_SIZE} MB" }
  validates_length_of :skill_list, minimum: 1, message: 'Skills cannot be blank.'
  validates_length_of :skill_list, maximum: 3, message: 'Skills can only have up to 3.'

  def following?(user)
    followings.include?(user)
  end

  def followed_by?(user)
    followers.include?(user)
  end

  def unfollow(user)
    followings.delete(user)
  end

  def followers=(user)
    followers << user
  end

  def followings=(user)
    followings << user
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def year_faculty
    '4th year Software Engineering Student'
  end

  def profile_image_url
    if profile_image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(profile_image, only_path: true)
    end
  end

  def skill_list
    skills.join(' ').split(' ')
  end

  def self.skills=(skills_array)
    skill_names = skills_array.uniq[0..2]
    puts "skillllllll #{skill_names}"
    new_or_found_skills = skill_names.collect { |name| Skill.find_or_create_by(name: name) }
    self.skills = new_or_found_skills
  end

  def self.expertise_ids=(expertise_array)
    expertises.destroy_all
    expertise_array = expertise_array.uniq[0..2]
    expertise_array.each do |id|
      puts "ID = #{id}"
      expertises << Expertise.find(id)
    end
  end

  def has_basic_info?
    completed = role.present? && faculty.present? && expertises.present? && skills.present?
    if role == 'student'
      completed && year.present?
    else
      completed
    end
  end
end
