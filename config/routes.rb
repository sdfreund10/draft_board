Rails.application.routes.draw do
  resources :application, only: [:show] do
    get :show, on: :collection
  end
  resources :drafts, only: [:create, :show]
  root :to => "application#show"
  resources :sessions, only: [:create]
  resources :users, only: [:create]
  resources :undrafted_players, only: [:index]
end
