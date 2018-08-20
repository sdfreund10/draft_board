class ApplicationController < ActionController::Base
  protect_from_forgery
  def show
    @current_user = User.find_by(id: session[:user])
    @drafts = user_drafts
  end

  private

  def user_drafts
    drafts = @current_user&.drafts
    return [] if drafts.empty?
    drafts.includes(:teams).map do |draft|
      draft.attributes.merge({ teams: draft.teams })
    end
  end
end
