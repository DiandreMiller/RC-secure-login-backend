const axios = require('axios');

const getMovies = async (request, response) => {
    try{
        const apiResponse = await axios.get('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies');
        const movies = apiResponse.data;
        console.log('movies:',movies);
        response.json(movies);
    } catch(error) {
        console.error('Error retrieving data:',error);
        response.status(500).json({error: error.message});
    }
};

const getOneMovieByTitle = async (request, response) => {

    const {title} = request.params;
    const encodedTitle = encodeURIComponent(title);

    try {
        const apiResponse = await axios.get(`https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies?title=${encodedTitle}`);
        const movie = apiResponse.data;
        console.log('movie:', movie);

        if(movie) {
            return response.json(movie);
        } else {
            return response.status(404).json({error: 'Movie not found'});
        }
    } catch(error) {
        console.error('Error retrieving data:', error);
        response.status(500).json({error: error.message});
    }
};

module.exports = { getMovies, getOneMovieByTitle };