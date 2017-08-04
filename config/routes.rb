Rails.application.routes.draw do
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
