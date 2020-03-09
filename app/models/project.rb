# frozen_string_literal: true

class Project < ApplicationRecord
  # TODO: [Anyone] Add full_desc
  has_many :members, dependent: :delete_all
  has_many :users, through: :members
  has_many :taggings, dependent: :delete_all
  has_many :tags, through: :taggings

  # TODO: [Eit] Validates fields
  validates :title, presence: true, length: { within: 1..50 }
  validates :short_desc, presence: true, length: { within: 1..150 }
  validates :start_date_before_type_cast,
            format: { with: /\A\d+-\d{2}-\d{2}\z/ }, allow_nil: true
  validates :end_date_before_type_cast,
            format: { with: /\A\d+-\d{2}-\d{2}\z/ }, allow_nil: true
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
end
