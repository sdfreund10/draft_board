class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :name
      t.string :position
      t.string :team
      t.integer :bye_week
      t.index %i(name position team), unique: true
      t.timestamps
    end
  end
end
