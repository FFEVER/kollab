# frozen_string_literal: true

class CreateJoinTableRoleSkill < ActiveRecord::Migration[6.0]
  def change
    create_join_table :roles, :skills do |t|
      t.index %i[role_id skill_id]
      # t.index [:skill_id, :role_id]
    end
  end
end
