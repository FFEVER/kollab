class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :body
      t.string :title
      t.belongs_to :project
      t.belongs_to :user

      t.timestamps
    end
  end
end
