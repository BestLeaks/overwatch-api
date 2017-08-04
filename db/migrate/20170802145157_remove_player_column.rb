class RemovePlayerColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :player_stats, :icon
    remove_column :player_stats, :level
    remove_column :player_stats, :levelIcon
    remove_column :player_stats, :prestige
    remove_column :player_stats, :prestigeIcon
    remove_column :player_stats, :rating
    remove_column :player_stats, :ratingIcon
    remove_column :player_stats, :ratingName
    remove_column :player_stats, :gamesWon
  end
end
