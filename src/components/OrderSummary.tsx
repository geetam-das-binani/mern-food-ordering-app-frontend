import { CartItem } from "@/pages/RestaurantDetailsPage";
import { Restaurant } from "@/types/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";
type Props = {
  restaurant: Restaurant;
  cartItems: Array<CartItem>;
  removeFromCart: (cartItemId: string) => void;
};
const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalCost = cartItems?.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    return (restaurant.deliveryPrice + totalCost).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between text-2xl font-bold tracking-tight">
          <span>Your Order</span>
          <span>₹ {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems?.map((item) => (
          <div key={item.name} className="flex justify-between">
            <span>
              <Badge variant={"outline"} className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                onClick={() => removeFromCart(item._id)}
              />
              ₹ {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{restaurant.deliveryPrice.toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
