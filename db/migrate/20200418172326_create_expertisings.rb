# frozen_string_literal: true

class CreateExpertisings < ActiveRecord::Migration[6.0]
  def change
    create_table :expertisings do |t|
      t.references :expertisable, polymorphic: true, null: false
      t.references :expertise, null: false

      t.timestamps
    end
  end
end
