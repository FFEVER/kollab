# frozen_string_literal: true

class CreateFollowings < ActiveRecord::Migration[6.0]
  def up
    create_table :followings do |t|
      t.references :followable, polymorphic: true, null: false
      t.integer :follower_id, null: false, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :followings
  end
end
