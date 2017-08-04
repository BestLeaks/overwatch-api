class CreatePlayerStats < ActiveRecord::Migration[5.1]
  def change
    create_table :player_stats do |t|
      t.string :icon
      t.string :name
      t.integer :level
      t.string :levelIcon
      t.integer :prestige
      t.string :prestigeIcon
      t.string :rating
      t.string :ratingIcon
      t.string :ratingName
      t.integer :gamesWon
      t.timestamps
    end
  end
end
