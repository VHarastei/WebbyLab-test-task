import { movieSchema } from './constants';

export const validateMoviesImport = async (text: string) => {
  const rawMovies = text.trim().split('\n\n');

  const moviePropNameByRawName = {
    Title: 'title',
    'Release Year': 'year',
    Format: 'format',
    Stars: 'actors',
  };

  type RowMovieProp = [keyof typeof moviePropNameByRawName, string];

  const movies: any[] = [];

  rawMovies.forEach((rawMovie) => {
    const rawMovieProps = rawMovie.trim().split('\n');
    if (!rawMovieProps) return;

    const movie: any = {};

    rawMovieProps.forEach((rawMovieProp) => {
      const movieProp = rawMovieProp.trim().split(': ') as RowMovieProp;
      if (!movieProp || movieProp.length < 2) return;

      const [rawName, rawValue]: RowMovieProp = movieProp;
      const name = moviePropNameByRawName[rawName];
      const value = name === 'actors' ? rawValue.trim().split(', ') : rawValue;

      const castedValue = movieSchema.fields[name].cast(value);
      if (!castedValue) return;

      movie[name] = castedValue;
    });

    movies.push(movie);
  });

  const moviesValidation = await Promise.all(
    movies.map(async (movie) => movieSchema.isValid(movie))
  );

  const isMoviesValid = moviesValidation.every((isValid) => isValid === true);

  return isMoviesValid;
};
