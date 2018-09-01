Rails.application.routes.draw do

  namespace :api do
    get 'likes/create'
    get 'likes/show'
    get 'likes/destroy'
  end
  namespace :api do
    get 'comments/index'
    get 'comments/create'
    get 'comments/destroy'
  end
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :update, :show, :destroy]
    resources :posts
    resource :session, only: [:create, :destroy]
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#root'
end
