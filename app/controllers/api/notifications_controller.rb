class Api::NotificationsController < ApplicationController

  def index
    @notifications = Notification.where(receiver_id: current_user.id).where.not(creator_id: current_user.id)
  end

  def show
    @notification = Notification.find(params[:id])
  end

  def update
    @notification = Notification.find(params[:id])
    if @notification.update(notification_params)
      render :show
    else
      render json: @notification.errors.full_messages, status: 422
    end
  end

  def notification_params
    params.require(:notification).permit(:creator_id, :receiver_id, :read, :notification_type, :post_id)
  end

end
