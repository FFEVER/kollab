# frozen_string_literal: true

class ChangeUserFaculty < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :faculty
    add_column :users, :faculty_id, :integer
  end
end
