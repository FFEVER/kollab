# frozen_string_literal: true

class Expertising < ApplicationRecord
  belongs_to :expertisable, polymorphic: true
  belongs_to :expertise
  validates_uniqueness_of :expertise, scope: %i[expertisable_id expertisable_type]

  def self.get_user_expertise(id)
    Expertising.find_by_expertisable_id(id)
  end
end
