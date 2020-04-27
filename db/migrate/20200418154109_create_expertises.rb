# frozen_string_literal: true

class CreateExpertises < ActiveRecord::Migration[6.0]
  def change
    create_table :expertises do |t|
      t.string :name
      t.references :parent, null: true, foreign_key: true

      t.timestamps
    end
  end
end
