$(document).ready(function(){
	var listMovies = [];
    $('#btnSubmit').click(function(e){
    	e.preventDefault()
    	var result = $('input[type="checkbox"]:checked');
    	var genre = result.val();
        var page = Math.floor((Math.random() * 190) + 1);
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
        $('.movieRecommendation').append($('<img>').attr('src', imageUrl));
    	$('.movieRecommendation').append(recommendation_title);
        $('.movieRecommendation').append(recommendation_summary);
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
            $('.movieRecommendation').empty();
            $('.movieRecommendation').append($('<img>').attr('src', imageUrl));
            $('.movieRecommendation').append(recommendation_title);
            $('.movieRecommendation').append(recommendation_summary);
        })
    };

    function handleError(error){
		console.log("error")
		console.log(error.responseText);
	};
});