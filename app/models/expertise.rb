# frozen_string_literal: true

class Expertise < ApplicationRecord
  has_many :subexpertises, class_name: 'Expertise', foreign_key: 'parent_id', dependent: :destroy
  belongs_to :parent, class_name: 'Expertise', optional: true
end
