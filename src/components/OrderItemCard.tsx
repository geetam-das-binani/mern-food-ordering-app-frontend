import { Order, OrderStatus } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { order_status } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrderStatus } from "@/api/MyRestaurantApi";
import { useState } from "react";
type Props = {
  order: Order;
};
const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const { updateRestaurantStatus, isPending } =
    useUpdateMyRestaurantOrderStatus();
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedHours = hours < 10 ? `0${hours}` : hours;
    return `${paddedHours}:${paddedMinutes}`;
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    try {
      await updateRestaurantStatus({
        orderId: order._id,
        status: newStatus,
      });
      setStatus(newStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="grid justify-between gap-6 mb-3 text-xl ">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              ₹ {order.totalAmount.toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            disabled={isPending}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
            value={status}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent position="popper">
              {order_status.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
