class AddProjectToRoles < ActiveRecord::Migration[6.0]
  def change
    add_reference :roles, :project, null: false, foreign_key: true
  end
end
