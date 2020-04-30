# frozen_string_literal: true

class AddProfileDescription < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :description, :string
    add_column :users, :github, :string
    add_column :users, :linkedin, :string
    add_column :users, :facebook, :string
    add_column :users, :instagram, :string
  end
end
