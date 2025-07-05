import { useState } from "react";
import SingleReview from "../../components/reviews/SingleReview";
import { MdOutlineArrowDownward } from "react-icons/md";

const ReviewSection = ({ product }) => {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleSeeMore = () => {
        setVisibleCount((prevCount) => prevCount + 4);
    };

    const reviewsToShow = product.reviews?.slice(0, visibleCount) || [];
    return (
        <div className='xs:w-[80%] w-[95%] mx-auto flex flex-col gap-16'>
            {reviewsToShow.map((reviews) => (
                <SingleReview key={reviews._id} reviews={reviews} />
            ))}

            {visibleCount < product.reviews?.length && (
                <button
                    onClick={handleSeeMore}
                    className="flex justify-center items-center gap-2 self-center py-3 px-6 rounded-lg   bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] text-white hover:from-[var(--accent-color)] hover:to-[var(--themeColor)]"
                >
                    more reviews
                    <MdOutlineArrowDownward />
                </button>
            )}
        </div>
    );
}


export default ReviewSection;