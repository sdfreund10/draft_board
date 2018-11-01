class UndraftedPlayersController < ApplicationController
  def index
    draft = Draft.find(params["id"])
    players = draft.undrafted_players.with_rankings(draft.format)
    players = players.where("name ILIKE ?", "%#{params["search"]}%") unless params["search"].empty?
    render json: {
      players: players.limit(params["limit"]).offset(offset).as_json,
      total: draft.undrafted_players.count
    }
  end

  private

  def offset
    params["page"].to_i * 25
  end
end
