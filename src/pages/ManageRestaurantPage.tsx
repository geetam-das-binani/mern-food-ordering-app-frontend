import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createMyRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();

  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();

  const { updateMyRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  if (isGetLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="inline-block  h-24 w-24 animate-spin rounded-full border-4 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </div>
    );
  }

  const isEditing = !!currentRestaurant;
  return (
    <ManageRestaurantForm
      onSave={!isEditing ? createMyRestaurant : updateMyRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      currentRestaurant={currentRestaurant || null}
    />
  );
};

export default ManageRestaurantPage;
