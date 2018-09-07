class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.create(follow_params)
    render json: @follow
  end

  def show
    @follow = Follow.find(params[:id])
  end

  def destroy
    @follow = Follow.find(params[:id])
    render :show
  end

  private

  def follow_params
    params.require(:follow).permit(:follower_id, :followee_id)
  end
end
