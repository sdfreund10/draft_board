class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    @user = User.find_by(session_params)
    if @user.nil?
      render json: { status: 400, body: "user not found"}
    else
      session[:user] = @user.id
      json = {
        user: { username: @user.username, id: @user.id },
        drafts: user_drafts
      }
      render json: { status: 200, body: json }
    end
  end

  private

  def session_params
    params.require(:session).permit(:username)
  end

  def user_drafts
    @user.drafts.includes(:teams).map do |draft|
      teams = draft.teams.map { |team| team.attributes.slice("pick", "name") }
      {
        name: draft.name,
        format: draft.format,
        teams: teams
      }
    end
  end
end
