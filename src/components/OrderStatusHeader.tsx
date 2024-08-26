import { Order } from "@/types/types";

import { Progress } from "./ui/progress";

type Props = {
  order: Order;
};
const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDeliveryDate = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      order.restaurant.estimatedDeliveryTime + created.getMinutes()
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };
  return (
    <>
      <h1 className="flex flex-col gap-5 text-4xl font-bold tracking-tight md:justify-between md:flex-row">
        <span className="text-gray-500">Order Status: {order.status}</span>
       <span>Expected by: {getExpectedDeliveryDate()}</span>
      </h1>
      <Progress value={66.66} className="animate-pulse" />
    </>
  );
};

export default OrderStatusHeader;


// 100*(1/5)=20
//100*(2/5)=40
//100*(3/5)=60
//100*(4/5)=80
//100*(5/5)=100
