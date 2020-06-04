# frozen_string_literal: true

class CreateJoinRequest < ActiveRecord::Migration[6.0]
  def change
    create_table :join_requests do |t|
      t.references :requester, null: false, foreign_key: { to_table: 'users' }
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
