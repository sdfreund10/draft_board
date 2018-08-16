class DraftsController < ApplicationController
  def create
    new_draft = Draft.new(draft_params)
    if new_draft.save
      team_data = new_draft.teams.order(:pick).map do |team|
        { id: team.id, name: team.name, pick: team.pick }
      end

      response = {
        draft: {
          id: new_draft.id, name: new_draft.name, format: new_draft.format,
          teams: team_data
        }
      }
      render json: response
    else
      render json: { message: "There was a problem saving your draft" }
    end
  end

  private

  def draft_params
    params.require(:draft).permit(
      :name, :format, :user_id, teams_attributes: [:name, :pick]
    )
  end
end
