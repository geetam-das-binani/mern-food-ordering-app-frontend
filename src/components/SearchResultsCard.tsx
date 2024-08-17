import { Restaurant } from "@/types/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};
const SearchResultsCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          className="object-cover w-full h-full rounded-md"
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
        />
      </AspectRatio>
     <div>
     <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">{restaurant.restaurantName}</h3>
      <div className="grid gap-2 md:grid-cols-2" id="card-content">
        <div className="flex flex-wrap">
          {restaurant.cuisines.map((cuisine, index) => (
            <span key={cuisine} className="flex">
              <span>{cuisine}</span>
              {index < restaurant.cuisines.length - 1 && <Dot />}
            </span>
          ))}
        </div>
        <div className="gap-2 flex-col flex">
          <div className="flex items-center gap-1 text-green-600">
            <Clock className="text-green-600" />
            {restaurant.estimatedDeliveryTime} mins
          </div>
          <div className="flex items-center gap-1">
            <Banknote />
            Delivery from ₹ {restaurant.deliveryPrice.toFixed(2)}
          </div>
        </div>
      </div>
     </div>
    </Link>
  );
};

export default SearchResultsCard;
