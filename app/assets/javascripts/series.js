$(document).ready(function(){
	var listSeries = [];
    $('#btnSubmit').click(function(e){
    	e.preventDefault()
    	var result = $('input[type="checkbox"]:checked');
    	var genre = result.val();
        var page = Math.floor((Math.random() * 10) + 1);
        console.log(page);
    	var url = 'https://api.themoviedb.org/3/discover/tv?api_key=c206e5f00d20a4cfe4d4f8fbe1befebd&language=en-US&sort_by=popularity.desc&page='+ page +'&timezone=America/New_York&with_genres='+ genre +'&include_null_first_air_dates=false'
    	if (result.length > 0) {
    		$.ajax({
				type: "GET",
				url: url,
				success: showSerie,
				error: handleError
			});
    	}
    	else {
    		alert("Nothing is checked.");
    	}
    })

    function showSerie (response){
    	console.log(response);
        $('.modal-header').hide();
     
    	listSeries = response.results;
    	recommendation = (listSeries[0]);
     	console.log(recommendation)
        var imageUrl = 'http://image.tmdb.org/t/p/w185' + recommendation.poster_path
    	var recommendation_title = $('<h4>').text(recommendation.title);
     	var recommendation_summary = $('<h5>').text(recommendation.overview);
     	$('.seriesRecommendation').append($('<img>').attr('src', imageUrl));
    	$('.seriesRecommendation').append(recommendation_title);
     	$('.seriesRecommendation').append(recommendation_summary);
     	$('.try-again').show();
     	$('.new-search').show();
        counter = 0
        $('.try-again').click(function(e){
            e.preventDefault()
            counter++
            new_serie = listSeries[counter]
            var imageUrl = 'http://image.tmdb.org/t/p/w185' + new_serie.poster_path
            var recommendation_title = $('<h4>').text(new_serie.title);
            var recommendation_summary = $('<h5>').text(new_serie.overview);
            $('.seriesRecommendation').empty();
            $('.seriesRecommendation').append($('<img>').attr('src', imageUrl));
            $('.seriesRecommendation').append(recommendation_title);
            $('.seriesRecommendation').append(recommendation_summary);
        })
    };

    function handleError(error){
		console.log("error")
		console.log(error.responseText);
	};
});
