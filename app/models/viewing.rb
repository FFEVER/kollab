# frozen_string_literal: true

class Viewing < ApplicationRecord
  belongs_to :viewable, polymorphic: true
  belongs_to :viewer, foreign_key: :viewer_id, class_name: 'User'

  scope :projects, -> { where(viewable_type: 'Project') }
  scope :users, -> { where(viewable_type: 'User') }
end
