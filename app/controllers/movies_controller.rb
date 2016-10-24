class MoviesController < ApplicationController
	def index
		@search = Tmdb::Search.new
	end
end
