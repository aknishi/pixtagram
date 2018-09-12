Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :update, :show, :destroy]
    resources :posts
    resource :session, only: [:create, :destroy]
    resources :likes, only: [:create, :index, :show, :destroy]
    resources :bookmarks, only: [:create, :index, :show, :destroy]
    resources :comments, only: [:create, :index, :show, :destroy]
    resources :follows, only: [:create, :destroy]
    resources :notifications, only: [:index, :show, :update]
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
end
