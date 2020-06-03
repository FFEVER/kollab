# frozen_string_literal: true

class AddProjectStatus < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :status, :string, default: 'In progress'
  end
end
