class PlayerStatsJson < ActiveRecord::Migration[5.1]
  def change
    add_column :player_stats, :player_data, :json
  end
end
