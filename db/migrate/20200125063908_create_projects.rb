# frozen_string_literal: true

class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :short_desc
      t.integer :project_status

      t.timestamps
    end
  end
end
