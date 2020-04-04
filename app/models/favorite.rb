# frozen_string_literal: true

class Favorite < ApplicationRecord
  belongs_to :project
  belongs_to :user
  validates_uniqueness_of :user, scope: %i[project]
end
