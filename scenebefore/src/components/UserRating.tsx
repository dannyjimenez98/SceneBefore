import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function UserRating() {
    const [watched, setWatched] = useState<boolean>(false);
  return (
    <div className="items-center pt-3">
            <button className={`btn btn-sm ${watched ? "btn-primary" : "btn-outline"} btn-primary`} onClick={() => setWatched(!watched)}>
                {watched ? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faPlus} /> }
                {watched ? "Watched!" : "Add to Watched"}
            </button>
            <div className={`rating rating-sm rating-half mx-2 ${watched ? null : "hidden"}`}>
                <input type="radio" name="rating-11" className="rating-hidden" defaultChecked/>
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="0.5 star" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="1 star" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="1.5 star"  />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="2 star" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="2.5 star" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="3 star" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="3.5 star" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="4 star" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-green-500" aria-label="4.5 star" />
                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-green-500" aria-label="5 star" />
            </div>
        </div>
  )
}
