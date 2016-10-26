Rails.application.routes.draw do

	root to: 'site#home'

	get '/movies', to: 'movies#index'
	get '/series', to: 'series#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
