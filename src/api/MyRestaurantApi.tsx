import { Restaurant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
   

    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      body: restaurantFormData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create restaurant");
    }
    return data;
  };

  const {
    mutate: createMyRestaurant,
    isPending: isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: createMyRestaurantRequest,
  });

  if (error) {
    toast.error(error.message);
    reset();
  }
  if (isSuccess) {
    toast.success("Restaurant created successfully");
    reset();
  }
  return { createMyRestaurant, isLoading };
};
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to get restaurant");
    }
    return data;
  };

  const {
    data: currentRestaurant,
    isPending: isLoading,
    error,
    
  } = useQuery({
    queryFn: getMyRestaurantRequest,
    queryKey: [" myRestaurant"],
  });

  if (error) {
    toast.error(error.message);
  }
  
  return { currentRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient()
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
   

    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      body: restaurantFormData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create restaurant");
    }
    return data;
  };

  const {
    mutate: updateMyRestaurant,
    isPending: isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: createMyRestaurantRequest,
  });

  if (error) {
    toast.error(error.message);
    reset();
  }
  if (isSuccess) {
    toast.success("Restaurant updated successfully");
   queryClient .invalidateQueries({ queryKey: [" myRestaurant"] });
    reset();
  }
  return { updateMyRestaurant, isLoading };
};
