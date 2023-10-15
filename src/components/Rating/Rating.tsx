import './style.scss';
import { IRating } from '@/app/interfaces';

function Rating(props: IRating) {
    const starWidth = 12;

    return (
    <div className="rating">
        <div className="rating__stars">
            <div className="rating__stars_rating"
                style={{width: ((props.averageRating 
                    ? props.averageRating : 0) * starWidth) + "px"}}
            >
            </div>
        </div>
        <span className="text-description rating__reviews-number">
            {props.reviews} reviews
        </span>
    </div>
    )
}
  
export default Rating