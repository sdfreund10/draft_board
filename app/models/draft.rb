class Draft < ApplicationRecord
  has_many :teams
  has_many :picks
  accepts_nested_attributes_for :teams 

  def latest_pick
    picks.order(:round, :pick).last
  end

  def undrafted_players
    Player.where(
      "NOT EXISTS (SELECT 1 FROM picks WHERE player_id = players.id AND draft_id = ?)",
      id
    )
  end
end
