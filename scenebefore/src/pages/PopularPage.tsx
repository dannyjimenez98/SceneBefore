import MoviesListTemplate from '../page_templates/MoviesListTemplate';

export default function PopularPage() {
  return (
    <MoviesListTemplate movieListType='popular' pageTitle='Popular' />
  );
}
