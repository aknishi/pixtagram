class Api::LikesController < ApplicationController

  def index
    @likes = Like.all
  end

  def create
    @like = Like.new(like_params)
    if @like.save
      render :show
    else
      render json: @like.errors.full_messages
    end
  end

  def show
    @like = Like.find(params[:id])
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    render :show
  end

  private

  def like_params
    params.require(:like).permit(:liker_id, :likeable_id, :likeable_type)
  end
end
