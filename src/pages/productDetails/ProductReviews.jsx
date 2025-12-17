import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  StarHalf,
  CheckCircle,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addReviews } from "../../features/reviews/reviews";
import { toast } from "react-toastify";
import { timeAgo } from "../../helper/helperFunctions";

const ReviewModal = ({ isOpen, onClose, productId }) => {
  const dispatch = useDispatch();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  // const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  // ------------------ IMAGE UPLOAD ------------------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (uploadedImages.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Each image must be under 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert("Only JPG, PNG, WebP allowed");
        return;
      }
    }

    const previews = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (id) => {
    const img = uploadedImages.find((i) => i.id === id);
    URL.revokeObjectURL(img.preview);
    setUploadedImages((prev) => prev.filter((i) => i.id !== id));
  };

  // ------------------ VIDEO UPLOAD ------------------
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert("Video must be under 50MB");
      return;
    }
    if (!["video/mp4", "video/webm", "video/ogg"].includes(file.type)) {
      alert("Only MP4, WebM, OGG allowed");
      return;
    }

    setUploadedVideo({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeVideo = () => {
    if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
    setUploadedVideo(null);
  };

  const closeModal = () => {
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
    setUploadedImages([]);
    setUploadedVideo(null);
    onClose();
  };

  // ------------------ YUP SCHEMA ------------------
  const ReviewSchema = Yup.object().shape({
    rating: Yup.number().min(1, "Rating is required").required(),
    title: Yup.string(),
    review: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // setUploading(true);

    try {
      const formData = new FormData();
      formData.append("productName", productId);
      formData.append("rating", values.rating);
      formData.append("title", values.title);
      formData.append("review", values.review);

      uploadedImages.forEach((img) => formData.append("images", img.file));
      if (uploadedVideo) formData.append("video", uploadedVideo.file);

      // console.log("Submitting →", {
      //   ...values,
      //   images: uploadedImages.length,
      //   video: uploadedVideo ? "included" : "none",
      // });

      const result = await dispatch(addReviews(formData)).unwrap();
      if (result.success) {
        // Cleanup
        uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
        if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
        // setSubmitting(false);
        resetForm();
        closeModal();
        toast.success("Review submitted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review");
    } finally {
      // setUploading(false);
      // setSubmitting(false)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={closeModal}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Write a Review</h3>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORMIK */}
        <Formik
          initialValues={{ rating: 0, title: "", review: "" }}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="space-y-6">
              {/* ⭐ RATING */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFieldValue("rating", star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star
                        size={32}
                        fill={
                          star <= (hoveredRating || values.rating)
                            ? "#F59E0B"
                            : "none"
                        }
                        color={
                          star <= (hoveredRating || values.rating)
                            ? "#F59E0B"
                            : "#D1D5DB"
                        }
                      />
                    </button>
                  ))}
                </div>
                <ErrorMessage
                  name="rating"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Title *
                </label>
                <Field
                  name="title"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
                  placeholder="Summarize your experience"
                />
                <ErrorMessage
                  name="title"
                  className="text-red-500 text-sm mt-1"
                  component="p"
                />
              </div>

              {/* REVIEW */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Review *
                </label>
                <Field
                  as="textarea"
                  name="review"
                  rows={5}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 resize-none"
                />
                <ErrorMessage
                  name="review"
                  className="text-red-500 text-sm mt-1"
                  component="p"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Upload Images (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Max 5 images (5MB each)
                </p>

                {uploadedImages.length < 5 && (
                  <label className="block w-full border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-orange-500">
                    Click to upload
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {uploadedImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.preview}
                          className="w-full h-24 rounded-lg object-cover border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Video (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Maximum 50MB (MP4, WebM, OGG)
                </p>
                {!uploadedVideo ? (
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 cursor-pointer transition-colors bg-gray-50 hover:bg-orange-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Play size={20} />
                      <span className="font-medium">Click to upload video</span>
                    </div>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative group">
                    <video
                      src={uploadedVideo.preview}
                      className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                      controls
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              {/* VIDEO UPLOAD */}

              {/* <div>
                <label className="text-sm font-semibold block mb-2">Upload Video (Optional)</label>
                {!uploadedVideo ? (
                  <label className="flex items-center justify-center w-full border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-orange-500">
                    <Play size={20} />
                    <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
                  </label>
                ) : (
                  <div className="relative">
                    <video src={uploadedVideo.preview} className="w-full h-40 rounded-lg border" controls />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div> */}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting || values.rating === 0}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl disabled:bg-gray-300"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
};

// Star Rating Component
const StarRating = ({ rating, size = 20 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;
        return (
          <div key={i}>
            {filled ? (
              <Star size={size} fill="#F59E0B" color="#F59E0B" />
            ) : half ? (
              <StarHalf size={size} fill="#F59E0B" color="#F59E0B" />
            ) : (
              <Star size={size} color="#D1D5DB" />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Image/Video Lightbox Component
const MediaLightbox = ({
  media,
  isOpen,
  onClose,
  currentIndex,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;

  const current = media[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {current?.type === "video" ? (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video controls className="w-full h-full">
              <source src={current.url} type="video/mp4" />
            </video>
          </div>
        ) : (
          <img
            src={current?.url}
            alt="Review"
            className="max-w-full max-h-full object-contain rounded-lg mx-auto"
          />
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100"
        >
          <X size={24} />
        </button>

        {media.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 rounded-full text-sm font-semibold">
          {currentIndex + 1} / {media.length}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Review Component
const ProductReviews = ({
  id,
  reviews,
  otherReviews,
  averageRating,
  totalReviews,
  productId,
  isFullPage=false
}) => {
  const navigate = useNavigate();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState("all");
  const [selectedTagFilter, setSelectedTagFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Calculate rating distribution
  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      dist[review.rating]++;
    });
    return dist;
  }, [reviews]);

  // Get unique tags
  const allTags = [
    "all",
    "Taste",
    "Packaging",
    "Texture",
    "Purity",
    "Quality",
    "Aroma",
  ];
  //    useMemo(() => {
  //     const tags = new Set();
  //     reviews.forEach((review) => {
  //       review.tags?.forEach((tag) => tags.add(tag));
  //     });
  //     return ["all", ...Array.from(tags)];
  //   }, [reviews]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const ratingMatch =
        selectedRatingFilter === "all" ||
        review.rating === parseInt(selectedRatingFilter);
      const tagMatch =
        selectedTagFilter === "all" || review.tags?.includes(selectedTagFilter);
      return ratingMatch && tagMatch;
    });
  }, [reviews, selectedRatingFilter, selectedTagFilter]);

  // Display only first 3 reviews initially
  const displayedReviews =isFullPage?filteredReviews: filteredReviews.slice(0, 3);
  // const displayedReviews = filteredReviews;

  const openLightbox = (media, index) => {
    setLightboxMedia(media);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleViewAll = () => {
    navigate(`/product/${productId}/reviews`, {
      state: { reviews, averageRating, totalReviews },
    });
  };

  return (
    <div className="bg-gray-50 py-12" id={id}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-3">
          Customer Reviews ({totalReviews})
        </h2>

        {/* Review Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Overall Rating */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center flex flex-col items-center justify-center border-t-4 border-orange-500">
            <p className="text-4xl font-extrabold text-gray-900">
              {averageRating?.toFixed(1)}
            </p>
            <StarRating rating={averageRating} size={28} />
            <p className="text-sm text-gray-600 mt-2">
              Based on {totalReviews} ratings
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReviewModal(true)}
              className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors text-sm"
            >
              Write a Review
            </motion.button>
          </div>

          {/* Rating Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating];
              const percentage =
                filteredReviews.length > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-4">
                    {rating} ★
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Rating Filter */}
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Filter by Rating
              </label>
              <div className="flex flex-wrap gap-2">
                {["all", "5", "4", "3", "2", "1"].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRatingFilter(rating)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedRatingFilter === rating
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {rating === "all" ? "All" : `${rating} ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Filter by Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTagFilter(tag)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedTagFilter === tag
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {tag.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length > 0 ? (
          <div className="space-y-6">
            {displayedReviews.map((review, idx) => {
              const reviewMedia = [
                ...review.images.map((img) => ({ type: "image", url: img })),
                ...(review.hasVideo
                  ? [{ type: "video", url: review.videoUrl || "#" }]
                  : []),
              ];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-orange-500 font-bold flex-shrink-0">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.userName}
                        </p>
                        {review.verified && (
                          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 rounded-full flex items-center gap-1 w-fit">
                            <CheckCircle size={12} /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <StarRating rating={review.rating} size={16} />
                      <span className="text-sm text-gray-500 block mt-1">
                        {timeAgo(review.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {review.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h5 className="font-semibold text-gray-900 mb-2">
                    {review.title}
                  </h5>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {review.review}
                  </p>

                  {/* Images & Videos */}
                  {reviewMedia.length > 0 && (
                    <div className="flex gap-3 flex-wrap">
                      {reviewMedia.map((media, mediaIdx) => (
                        <div
                          key={mediaIdx}
                          onClick={() => openLightbox(reviewMedia, mediaIdx)}
                          className="w-24 h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative"
                        >
                          {media.type === "image" ? (
                            <img
                              src={media.url}
                              alt="Review"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-black/80 flex items-center justify-center relative">
                              <Play size={32} color="white" fill="white" />
                              <span className="absolute bottom-1 right-2 text-xs text-white bg-black/50 px-1 rounded">
                                Video
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500 text-lg">
              No reviews match your filters
            </p>
          </div>
        )}

        {/* View All Reviews Button */}
        {filteredReviews.length > 3 && !isFullPage && (
          <div className="text-center mt-10">
            <button
              onClick={handleViewAll}
              className="px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors"
            >
              View All {filteredReviews.length} Reviews
            </button>
          </div>
        )}
      </div>

      {otherReviews?.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Top Rated on Amazon and Flipkart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {otherReviews?.map((review, idx) => (
              <Link
                to={review.url}
                target="_blank"
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center border border-gray-200 hover:border-gray-400"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {review.platform}
                </h4>
                <StarRating rating={review.rating} size={20} />
                <p className="text-3xl font-bold text-gray-900 mt-4">
                  {review.rating}
                </p>
                <p className="text-sm text-gray-500">
                  {review.totalReviews}+ reviews & ratings
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showReviewModal && (
          <ReviewModal
            isOpen={showReviewModal}
            onClose={() => setShowReviewModal(false)}
            productId={productId}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxOpen && (
          <MediaLightbox
            media={lightboxMedia}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            currentIndex={lightboxIndex}
            onNext={() =>
              setLightboxIndex((lightboxIndex + 1) % lightboxMedia.length)
            }
            onPrev={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + lightboxMedia.length) %
                  lightboxMedia.length
              )
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductReviews;
