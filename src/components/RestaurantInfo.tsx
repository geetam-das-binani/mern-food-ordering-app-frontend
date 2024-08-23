import { Restaurant } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};
const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-slate">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city} , {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center">
        {restaurant.cuisines.map((item, index) => (
          <span key={item} className="flex items-center">
            <span>{item}</span>
            {index + 1 !== restaurant.cuisines.length && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
