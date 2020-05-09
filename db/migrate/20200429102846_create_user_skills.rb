# frozen_string_literal: true

class CreateUserSkills < ActiveRecord::Migration[6.0]
  def change
    create_table :user_skills do |t|
      t.references :skill, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
