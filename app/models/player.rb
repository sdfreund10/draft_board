class Player < ApplicationRecord
  has_many :rankings

  def self.with_rankings(type)
    joins(:rankings).where(rankings: { format: type }).select(
      :id, :name, :position, :team, :bye_week,
      "AVG(rank) AS rank",
      "json_object_agg(rankings.source, rankings.rank) AS sources"
    ).group(
      :id, :name, :position, :team, :bye_week,
    ).order("rank")
  end
end
