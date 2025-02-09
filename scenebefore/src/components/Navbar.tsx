import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm relative z-1">
        {/* Medium or smaller screens */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-300 rounded-box z-1
         mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a>Movies</a>
                <ul className="p-2">
                  <li>
                    <Link to="/popular">Popular</Link>
                  </li>
                  <li>
                    <Link to="/now_playing">Now Playing</Link>
                  </li>
                  <li>
                    <Link to="/upcoming">Upcoming</Link>
                  </li>
                  <li>
                    <Link to="/top_rated">Top Rated</Link>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">SceneBefore</a>
        </div>

        {/* Large Screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <details>
                <summary>Movies</summary>
                <ul className="p-2 bg-base-300">
                  <li>
                    <Link className="whitespace-nowrap" to="/popular">
                      Popular
                    </Link>
                  </li>
                  <li>
                    <Link className="whitespace-nowrap" to="/now_playing">
                      Now Playing
                    </Link>
                  </li>
                  <li>
                    <Link className="whitespace-nowrap" to="/upcoming">
                      Upcoming
                    </Link>
                  </li>
                  <li>
                    <Link className="whitespace-nowrap" to="/top_rated">
                      Top Rated
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex gap-2">
            <SearchBar />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/user" className="justify-between">Profile</Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
