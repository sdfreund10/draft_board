class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      session[:user] = user.id
      render json: {
        status: 200,
        body: { user: { username: user.username, id: user.id }, drafts: [] }
      }
    else
      render json: { status: 400, body: user.errors }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
