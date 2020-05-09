# frozen_string_literal: true

class ChangeYearToString < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :year, :string, null: true
  end
end
