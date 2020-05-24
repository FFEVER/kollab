# frozen_string_literal: true

class AddUserMediumSocialLink < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :medium, :string
  end
end
