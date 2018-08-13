class DraftsController < ApplicationController
  def new
    Draft.create!(draft_params)
    session[:drafts] ||= []
    session[:drafts] << 
  end

  private

  def draft_params
    params.require(:draft).permit(:name)
  end
end
