# frozen_string_literal: true

class AddUserContact < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :phone, :string
  end
end
