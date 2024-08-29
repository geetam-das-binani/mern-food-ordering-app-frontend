import { Order } from "@/types/types";

import { Progress } from "./ui/progress";
import { order_status } from "@/config/order-status-config";

type Props = {
  order: Order;
};
const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDeliveryDate = () => {
    const created = new Date(order.createdAt).getTime();
    // created.setMinutes(
    //   order.restaurant.estimatedDeliveryTime + created.getMinutes()
    // );

    // const hours = created.getHours();
    // const minutes = created.getMinutes();
    const timeInMilliseconds =
      created + order.restaurant.estimatedDeliveryTime * 60 * 1000;
    const minutes = new Date(timeInMilliseconds).getMinutes();
    const hours = new Date(timeInMilliseconds).getHours();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedHours = hours < 10 ? `0${hours}` : hours;
    return `${paddedHours}:${paddedMinutes}`;
  };
  const getOrderStatusInfo = () =>
    order_status.find((o) => o.value === order.status) ||  order_status[0]
  
  return (
    <>
      <h1 className="flex flex-col gap-5 text-4xl font-bold tracking-tight md:justify-between md:flex-row">
        <span className="text-gray-500">Order Status: {getOrderStatusInfo()?.label}</span>
        <span>Expected by: {getExpectedDeliveryDate()}</span>
      </h1>
      <Progress
        value={getOrderStatusInfo()?.progressValue}
        className="animate-pulse"
      />
    </>
  );
};

export default OrderStatusHeader;
