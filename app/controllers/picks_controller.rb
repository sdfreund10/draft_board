class PicksController < ApplicationController
  def create
    pick = Pick.create!(pick_params)
    draft = Draft.find(pick_params[:draft_id])

    new_player = draft.undrafted_players.with_rankings(draft.format).limit(25).last
    render json: {
      status: 200,
      pick: pick,
      player: new_player
    }
  end

  private

  def pick_params
    params.require(:pick).permit(:draft_id, :player_id, :round, :pick, :overall, :team_id)
  end
end
