# frozen_string_literal: true

class JoinRequest < ApplicationRecord
  # TODO: [Anyone] Add role to Member
  belongs_to :user
  belongs_to :project
  validates_uniqueness_of :user_id, scope: [:project_id]

    # def role
    #   # TODO: [Eit] Handle other roles
    #   return 'Project Owner' if is_owner
    # end
  end
