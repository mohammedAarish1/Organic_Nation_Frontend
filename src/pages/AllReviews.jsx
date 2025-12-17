import { useLocation,  useParams } from "react-router-dom";
import ProductReviews from "./productDetails/ProductReviews";

// Star Rating Component

// Main All Reviews Page
const AllReviews = () => {
  const location = useLocation();
  const { productId } = useParams();
  // Get data from location state or use defaults
  const {
    reviews = [],
    averageRating = 0,
    totalReviews = 0,
  } = location.state || {};

  return (
    <ProductReviews
      reviews={reviews}
      averageRating={averageRating}
      totalReviews={totalReviews}
      productId={productId}
      isFullPage
    />
  );
};

export default AllReviews;
