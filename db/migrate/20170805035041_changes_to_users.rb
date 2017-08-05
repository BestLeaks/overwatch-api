class ChangesToUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :info
    add_column :users, :battletag, :string
    add_column :users, :platform, :string, limit: 3
    add_column :users, :region, :string, limit: 6 
  end
end
