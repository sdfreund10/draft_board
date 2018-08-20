class CreatePicks < ActiveRecord::Migration[5.2]
  def change
    create_table :picks do |t|
      t.integer :round
      t.integer :pick
      t.integer :overall
      t.references :team
      t.references :draft
      t.references :player
      t.timestamps
    end
  end
end
