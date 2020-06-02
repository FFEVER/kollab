# frozen_string_literal: true

class AddLongDescriptionToProject < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :long_desc, :string, default: ''
  end
end
