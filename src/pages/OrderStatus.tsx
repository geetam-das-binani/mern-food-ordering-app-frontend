import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";

const OrderStatus = () => {
  const { isLoading, orders } = useGetMyOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="inline-block  h-24 w-24 animate-spin rounded-full border-4 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </div>
    );
  }
  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        No Orders Found ❌
      </div>
    );
  }
  return <div className="space-y-10">
          {
            orders.map(order=>(
              <div key={order._id} className="p-10 space-y-10 rounded-lg bg-gray-50">
                <OrderStatusHeader order={order} />
              </div>
            ))
          }
    </div>;
};

export default OrderStatus;
