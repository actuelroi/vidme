import { Star } from "lucide-react";

const reviews = [
  {
    name: "Jean Dupont",
    rating: 5,
    feedback:
      "Très bonne qualité ! Les gants sont chauds et fonctionnent bien avec l'écran tactile.",
  },
  {
    name: "Sarah Martin",
    rating: 4,
    feedback:
      "Confortables et légers. La livraison a été rapide, je recommande.",
  },
  {
    name: "Lucas Bernard",
    rating: 5,
    feedback:
      "Parfaits pour le vélo en hiver. Bonne prise en main et coupe-vent.",
  },
  {
    name: "Emma Laurent",
    rating: 3,
    feedback:
      "Corrects mais un peu fins pour les températures très froides.",
  },
  {
    name: "Thomas Petit",
    rating: 5,
    feedback:
      "Excellent rapport qualité/prix. Je vais en commander une autre paire.",
  },
];

const CustomerReviews = () => {
  return (
    <div className="mt-8 border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

      <div className="space-y-5">
        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-4 last:border-none">
            {/* Name + Rating */}
            <div className="flex items-center justify-between">
              <p className="font-medium">{review.name}</p>

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Feedback */}
            <p className="text-sm text-gray-600 mt-2">
              {review.feedback}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
