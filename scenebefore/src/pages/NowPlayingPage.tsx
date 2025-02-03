import MoviesListTemplate from "../page_templates/MoviesListTemplate"

export default function NowPlayingPage() {
  return (
    <MoviesListTemplate movieListType='now_playing' pageTitle='Now Playing' />
  )
}
