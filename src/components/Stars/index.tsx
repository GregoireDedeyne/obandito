import { StarIcon } from '@heroicons/react/20/solid';

export function Stars({ reviews }) {
  // Function to calculate the average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  // Function to generate stars based on the average rating
  const renderStars = (averageRating) => {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating - fullStars >= 0.5;

    const starArray = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starArray.push(
          <StarIcon key={i} className="text-yellow-400 h-5 w-5 flex-shrink-0" />
        );
      } else if (i === fullStars && hasHalfStar) {
        starArray.push(
          <StarIcon key={i} className="text-yellow-400 h-5 w-5 flex-shrink-0" />
        );
      } else {
        starArray.push(
          <StarIcon key={i} className="text-gray-300 h-5 w-5 flex-shrink-0" />
        );
      }
    }

    return starArray;
  };

  const averageRating = calculateAverageRating(reviews);

  return (
    <span className="flex items-center">{renderStars(averageRating)}</span>
  );
}
