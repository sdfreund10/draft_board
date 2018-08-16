Rails.application.routes.draw do
  resources :application, only: [:show] do
    get :show, on: :collection
  end
  resources :drafts
  root :to => "application#show"
  resources :sessions, only: [:create]
  resources :users, only: [:create]
end
