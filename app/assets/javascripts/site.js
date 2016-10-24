$(document).ready(function(){
	var listMovies = [];
    $('#btnSubmit').click(function(e){
    	e.preventDefault()
    	var result = $('input[type="checkbox"]:checked');
    	var genre = result.val();
    	var url = "https://api.themoviedb.org/3/discover/movie?api_key=c206e5f00d20a4cfe4d4f8fbe1befebd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_genres="
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
    	listMovies = response.results;
    	var index = 0; 
    	listMovies.forEach( function(movie) {
    		console.log(movie.title);
    	})
    };

    function handleError(error){
			console.log("error")
			console.log(error.responseText);
	};
});
