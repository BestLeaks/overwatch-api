Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", sessions: 'users/sessions' }
  devise_scope :user do
    get "/users/finish_signup" => "users/omniauth_callbacks#finish_signup"
    post "/users/finished_signup" => "users/omniauth_callbacks#finished_signup"
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'homes#index'
  resources :player_stats, to: 'homes#index'


  namespace :api do
    namespace :v1 do
      resources :player_stats, param: :name do
        post 'data', on: :collection
        get 'history', on: :collection
      end
    end
  end
end
