# frozen_string_literal: true

class CreateFavorites < ActiveRecord::Migration[6.0]
  def up
    create_table :favorites do |t|
      t.references :user, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end

  def down
    drop_table :favorites
  end
end
