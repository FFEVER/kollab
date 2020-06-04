# frozen_string_literal: true

class CreateRole < ActiveRecord::Migration[6.0]
  def change
    create_table :roles do |t|
      t.string :title
      t.string :description
      t.string :status

      t.timestamps
    end
  end
end
