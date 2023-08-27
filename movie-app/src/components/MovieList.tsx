import React, { useEffect, useState } from 'react';

interface Movie {
    id: number;
    title: string;
    genre: string;
    isShowing: boolean;
    releasedAt: string;
    endAt: string;
}

interface Filter {
    genre: string | null;
    isShowing: string | null;
}

function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filters, setFilters] = useState<Filter>({ genre: null, isShowing: null});

    useEffect(() => {
        let apiUrl = 'http://localhost:8080/api/v1/movies';

        if (filters.genre || filters.isShowing) {
            apiUrl += '?';

            if (filters.genre) apiUrl += `genre=${filters.genre}`;
            if (filters.isShowing) {
                if (filters.genre) apiUrl += '&';
                apiUrl += `isShowing=${filters.isShowing}`;
            }
        }

        fetch(apiUrl.toString())
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('데이터 불러오기 오류', error));
    }, [filters]);
    
    const handleMovieClick = (id: number) => {
        
    }

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, genre: event.target.value || null });
    }

    const handleIsShowingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, isShowing: event.target.value || null });
    }

    return (
        <div>
            <h1>Movie List</h1>
            <div className="filters">
                <label>
                    Genre:
                    <select value={filters.genre || ''} onChange={handleGenreChange}>
                        <option value="">All</option>
                        <option value="ACTION">ACTION</option>
                        <option value="COMEDY">COMEDY</option>
                        <option value="ROMANCE">ROMANCE</option>
                        <option value="THRILLER">THRILLER</option>
                    </select>
                </label>
                <label>
                    Is Showing:
                    <select value={filters.isShowing === null ? '' : filters.isShowing} onChange={handleIsShowingChange}>
                        <option value="">All</option>
                        <option value="0">Not Showing</option>
                        <option value="1">Showing</option>
                    </select>
                </label>
            </div>
            <ul>
                {movies.length === 0 ? (
                    <p>No movies found for the selected filters.</p>
                ) : (
                    movies.map(movie => (
                        <li key={movie.id}>
                            <h2>{movie.title}</h2>
                            <p>Genre: {movie.genre}</p>
                            <p>Is Showing: {movie.isShowing ? 'Yes' : 'No'}</p>
                            <p>Released At: {movie.releasedAt}</p>
                            <p>End At: {movie.endAt}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default MovieList;