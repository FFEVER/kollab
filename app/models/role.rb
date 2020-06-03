# frozen_string_literal: true

class Role < ApplicationRecord
  belongs_to :project

  has_many :members

  has_and_belongs_to_many :expertises
  has_and_belongs_to_many :skills
end
