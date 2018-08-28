class Api::UsersController < ApplicationController
  before_action :require_login, only: [:index, :show]

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def updated
    @user = User.find(params[:id])
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :name, :email)
  end
end
