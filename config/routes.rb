Rails.application.routes.draw do
  resources :application do
    get :show, on: :collection
  end
  root :to => "application#show"
end
