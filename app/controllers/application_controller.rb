class ApplicationController < ActionController::Base
  protect_from_forgery
  def show
    @current_user = User.find_by(id: session[:user])
    @drafts = @current_user&.drafts || []
  end
end
