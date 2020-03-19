# frozen_string_literal: true

class CreateMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :members do |t|
      t.boolean :is_owner
      t.belongs_to :user
      t.belongs_to :project

      t.timestamps
    end
  end
end
