# frozen_string_literal: true

class DropTagsTable < ActiveRecord::Migration[6.0]
  def up
    drop_table :tags
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
