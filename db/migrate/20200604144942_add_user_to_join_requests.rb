class AddUserToJoinRequests < ActiveRecord::Migration[6.0]
  def change
    add_reference :join_requests, :user, null: false, foreign_key: true
    remove_column :join_requests, :requester_id
  end
end
