class CreateViewings < ActiveRecord::Migration[6.0]
  def change
    create_table :viewings do |t|
      t.references :viewable, polymorphic: true, null: false
      t.integer :viewer_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
