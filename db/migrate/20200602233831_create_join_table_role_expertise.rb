# frozen_string_literal: true

class CreateJoinTableRoleExpertise < ActiveRecord::Migration[6.0]
  def change
    create_join_table :roles, :expertises do |t|
      t.index %i[role_id expertise_id]
      # t.index %i[expertise_id role_id]
    end
  end
end
