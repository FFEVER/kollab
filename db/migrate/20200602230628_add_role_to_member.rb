# frozen_string_literal: true

class AddRoleToMember < ActiveRecord::Migration[6.0]
  def change
    add_reference :members, :role, index: true
  end
end
