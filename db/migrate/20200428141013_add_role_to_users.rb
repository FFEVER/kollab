class AddRoleToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :role, :string
    add_column :users, :faculty, :string
    add_column :users, :year, :integer, null: true
  end
end
