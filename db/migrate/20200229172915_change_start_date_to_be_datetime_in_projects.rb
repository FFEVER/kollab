# frozen_string_literal: true

class ChangeStartDateToBeDatetimeInProjects < ActiveRecord::Migration[6.0]
  def up
    change_column :projects, :start_date, :datetime
    change_column :projects, :end_date, :datetime
  end

  def down
    change_column :projects, :start_date, :date
    change_column :projects, :end_date, :date
  end
end
