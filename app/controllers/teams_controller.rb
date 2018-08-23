class TeamsController < ApplicationController
  def show
    team = Team.find_by(params.permit(:id))
    render json: {
      team: team,
      summary: team.players.group(:position).count,
      players: team.players.with_rankings(params["format"])
    }
  end
end
