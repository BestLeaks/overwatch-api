class AddTwitch < ActiveRecord::Migration[5.1]
  def change
    add_column :player_stats, :addTwitch, :string
  end
end
