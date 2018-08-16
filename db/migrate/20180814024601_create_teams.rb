class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :pick
      t.references :draft
      t.timestamps
    end
  end
end
