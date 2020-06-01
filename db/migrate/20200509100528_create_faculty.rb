# frozen_string_literal: true

class CreateFaculty < ActiveRecord::Migration[6.0]
  def change
    create_table :faculties do |t|
      t.string :name

      t.timestamps
    end
  end
end
