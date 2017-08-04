class CreateQuickPlays < ActiveRecord::Migration[5.1]
  def change
    create_table :quick_plays do |t|
      t.string :name
      t.belongs_to :player_stat
      t.timestamps
    end
  end
end
