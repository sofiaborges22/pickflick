$(document).ready(function(){
	var listMovies = [];
    $('#btnSubmit').click(function(e){
    	e.preventDefault()
    	var result = $('input[type="checkbox"]:checked');
    	var genre = result.val();
        var page = Math.floor((Math.random() * 80) + 1);
        console.log(page);
    	var url = 'https://api.themoviedb.org/3/discover/movie?api_key=c206e5f00d20a4cfe4d4f8fbe1befebd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page='+ page +'&with_genres='
    	var searchUrl = url + genre
    	if (result.length > 0) {
    		$.ajax({
				type: "GET",
				url: searchUrl,
				success: showMovie,
				error: handleError
			});
    	}
    	else {
    		alert("Nothing is checked.");
    	}
    })

    function showMovie (response){
        $('.modal-header').hide();
        console.log(response.total_pages)
    	listMovies = response.results;
    	recommendation = (listMovies[0]);
        console.log(recommendation)
        var imageUrl = 'http://image.tmdb.org/t/p/w185' + recommendation.poster_path
    	var recommendation_title = $('<h4>').text(recommendation.title);
        var recommendation_summary = $('<h5>').text(recommendation.overview);
        var recommendation_rating = $('<h5>').text("Voter Rating: " + recommendation.vote_average)
        var recommendation_release_date = $('<h5>').text("Release Date: " + recommendation.release_date)
        $('.movieRecommendation').append($('<img>').attr('src', imageUrl));
    	$('.movieRecommendation').append(recommendation_title);
        $('.movieRecommendation').append(recommendation_summary);
        $('.movieRecommendation').append(recommendation_rating);
        $('.movieRecommendation').append(recommendation_release_date);
        $('.try-again').show();
        $('.new-search').show();
        counter = 0
        $('.try-again').click(function(e){
            e.preventDefault()
            counter++
            new_movie = listMovies[counter]
            var imageUrl = 'http://image.tmdb.org/t/p/w185' + new_movie.poster_path
            var recommendation_title = $('<h4>').text(new_movie.title);
            var recommendation_summary = $('<h5>').text(new_movie.overview);
            var recommendation_rating = $('<h5>').text("Voter Rating: " + new_movie.vote_average)
            var recommendation_release_date = $('<h5>').text("Release Date: " + new_movie.release_date)
            $('.movieRecommendation').empty();
            $('.movieRecommendation').append($('<img>').attr('src', imageUrl));
            $('.movieRecommendation').append(recommendation_title);
            $('.movieRecommendation').append(recommendation_summary);
            $('.movieRecommendation').append(recommendation_rating);
            $('.movieRecommendation').append(recommendation_release_date);
        })
    };

    function handleError(error){
		console.log("error")
		console.log(error.responseText);
	};
});