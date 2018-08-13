class ApplicationController < ActionController::Base
  def show
    draft_ids = session[:drafts] ||= []
    @drafts = Draft.where(id: draft_ids)
  end
end
