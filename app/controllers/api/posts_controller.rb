class Api::PostsController < ApplicationController
  before_action :require_login

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
  end

  def create
  end
end
