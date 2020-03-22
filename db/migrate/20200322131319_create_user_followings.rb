# frozen_string_literal: true

class CreateUserFollowings < ActiveRecord::Migration[6.0]
  def change
    create_table :user_followings do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :follower_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
