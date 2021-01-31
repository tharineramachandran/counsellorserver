import React, { useReducer, useEffect, useState } from 'react';
import _AxiosInstance from '../Store/_AxiosInstance'
import DisplayAllGeresOfMovies from '../Containers/DisplayAllGeresOfMovies';
import { Grid } from 'semantic-ui-react'
import SearchGenresResult from '../Containers/SearchGenresResult'



const initState = {
    movieList: [],
    Itype: ''
}

const reducder = (prevState, action) => {
    switch (action.type) {
        case 'FETCH_MOVIE':
            return {
                movieList: action.payload.data.results,
                Itype: 'movie'
            };
        case 'FETCH_TV':
            return {
                movieList: action.payload.data.results,
                Itype: 'tv'
            };

        default:
            return prevState;
    }
}

const _Redux = props => {

    const [stateTrending, dispatchTrending] = useReducer(reducder, initState);
    const [seletedGenreMovieId, setSeletedGenreMovieId] = useState({ type: '', id: '', name: '', _Itype: '' });
    const [movie, setMovie] = useState([]);
    const [value, setValue] = useState(false);

    useEffect(() => {
        _AxiosInstance.get(props.url)
            .then(data => {
                dispatchTrending({ type: props.FetchType, payload: data, })
            })
            .catch(err => {

            })
    }, []);

    const selectedMovie = (movie, e) => {
        setSeletedGenreMovieId({
            id: movie.id,
            type: movie.media_type,
            name: movie.title || movie.name,
            _Itype: e
        });
        setValue(true);
    }

    useEffect(() => {
        let movies = stateTrending.movieList.map((movie) => {
            let movieImageUrl = 'https://image.tmdb.org/t/p/w500/' + movie.id;

            if (movieImageUrl !== null) {
                const movieComponent = (
                    <DisplayAllGeresOfMovies
                        movieDetials={e => selectedMovie(movie, e)}
                        key={movie.id}
                        movie={movie}
                        ITypeMovie={stateTrending.Itype}
                    />
                );
                return movieComponent;
            }
        });

        setMovie(movies);

    }, [stateTrending.movieList]);

    return (
        <React.Fragment>
            <Grid padded>
                <Grid.Row>
                    <Grid.Column className="scrollmenuImageBigger">
                        {movie}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {value ? <SearchGenresResult Ids={seletedGenreMovieId} /> : " "}
        </React.Fragment>

    )
}

export default _Redux;