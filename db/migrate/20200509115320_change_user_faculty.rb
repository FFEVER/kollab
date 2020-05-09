# frozen_string_literal: true

class ChangeUserFaculty < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :faculty
    add_reference :users, :faculty, index: true
  end
end
