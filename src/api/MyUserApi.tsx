import { User } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  authOId: string;
  email: string;
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    try {
      const accessToken = await getAccessTokenSilently();
      console.log(123);

      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  const {
    data: currentUser,
    isPending,
    error,
  } = useQuery({
    queryKey: [" myuser"],
    queryFn: getMyUserRequest,
  });

  if (error) {
    toast.error(error?.message.toString() || "Failed to fetch profile", {
      duration: 2000,
      closeButton: true,
    });
  }

  return { currentUser, isPending };
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  const {
    mutateAsync: createUser,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: createMyUserRequest,
  });

  return { createUser, isError, isSuccess, isPending };
};

type UpdateMuUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMuUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  const {
    mutateAsync: updateUser,
    isSuccess,
    isPending: isLoading,
    error,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });
  if (isSuccess) {
    toast.success("Profile updated successfully");
    reset();
  }
  if (error) {
    toast.error(error?.message.toString() || "Failed to update profile");
    reset();
  }

  return { updateUser, isLoading };
};
