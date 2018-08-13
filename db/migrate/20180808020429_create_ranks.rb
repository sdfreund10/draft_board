class CreateRanks < ActiveRecord::Migration[5.2]
  def change
    create_table :rankings do |t|
      t.integer :rank
      t.string :player_name
      t.string :position
      t.string :team
      t.string :source
      t.string :format
      t.references :player
      t.timestamps
    end
  end
end
