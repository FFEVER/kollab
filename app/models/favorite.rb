# frozen_string_literal: true

class Favorite < ApplicationRecord
  belongs_to :project
  belongs_to :user
end
