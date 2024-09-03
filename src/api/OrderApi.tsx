import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { CheckOutSessionrequest, Order } from "@/types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyOrdersRequest = async ():Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      method: "GET",
      headers: {
       
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message ?? "Failed to get my orders");
    }
    return data;
  };
  const { data:orders, isLoading, error ,isSuccess} = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrdersRequest,
  });
  
  if (error) {
    toast.error(error?.message ?? "Failed to fetch  my orders");
  }
  if(isSuccess){
    toast.success("Orders fetched successfully",{duration:2000});
  }

  return { orders, isLoading };
};
export const useCreateCheckOutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckOutSessionRequest = async (
    checkOutSessionRequest: CheckOutSessionrequest
  ): Promise<{ url: string }> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(checkOutSessionRequest),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message ?? "Failed to create checkout session");
    }
    return data;
  };
  const {
    mutateAsync: createCheckOutSession,
    isPending,
    reset,
    error,
  } = useMutation({
    mutationFn: createCheckOutSessionRequest,
  });
  if (error) {
    toast.error(error?.message ?? "Failed to create checkout session");
    reset();
  }

  return { createCheckOutSession, isPending };
};
