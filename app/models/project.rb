# frozen_string_literal: true

class Project < ApplicationRecord
  # TODO: [Anyone] Add full_desc
  has_many :members
  has_many :users, through: :members

  # TODO: [Eit] Validates tags, fields
  validates :title, presence: true, length: { within: 1..50 }
  validates :short_desc, presence: true, length: { within: 1..150 }
  validates :start_date_before_type_cast,
            format: { with: /\A\d+-\d{2}-\d{2}\z/ }, allow_nil: true
  validates :end_date_before_type_cast,
            format: { with: /\A\d+-\d{2}-\d{2}\z/ }, allow_nil: true
  validate :start_date_greater_than_end_date

  def start_date_greater_than_end_date
    return if [start_date.blank?, end_date.blank?].any?

    if start_date > end_date
      errors.add(:start_date, 'must happend before end date')
    end
  end
end
