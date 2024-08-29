import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect } from "react";

const ManageRestaurantPage = () => {
  const { createMyRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();

  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();

  const { updateMyRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { restaurantOrders } = useGetMyRestaurantOrders();

  if (isGetLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="inline-block  h-24 w-24 animate-spin rounded-full border-4 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </div>
    );
  }

  const isEditing = !!currentRestaurant;
 
 

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        {restaurantOrders && restaurantOrders.length > 0 && (
          <TabsTrigger value="orders">Orders</TabsTrigger>
        )}
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      {restaurantOrders && restaurantOrders.length > 0 && (
        <TabsContent
          value="orders"
          className="p-10 space-y-5 rounded-lg bg-gray-50"
        >
          <h2 className="text-2xl font-bold">
            {restaurantOrders.length > 0 ? (
              <>
                {restaurantOrders.length} Active order
                {restaurantOrders.length > 1 ? "s" : ""}
              </>
            ) : (
              "No active orders"
            )}
          </h2>
          {restaurantOrders?.map((order) => (
            <OrderItemCard key={order._id} order={order} />
          ))}
        </TabsContent>
      )}
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          onSave={!isEditing ? createMyRestaurant : updateMyRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
          currentRestaurant={currentRestaurant || null}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
