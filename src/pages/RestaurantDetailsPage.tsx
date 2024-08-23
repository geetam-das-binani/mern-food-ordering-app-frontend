import { useCreateCheckOutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

import { useState } from "react";

import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
const RestaurantDetailsPage = () => {
  const { id: restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId!);
  const { createCheckOutSession, isPending:isCheckoutLoading } = useCreateCheckOutSession();
  const [cartItems, setCartItems] = useState<Array<CartItem>>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const onCheckOut = async (userFormData: UserFormData) => {
    if (!restaurantId || !restaurant?._id) return;
    const checkOutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        quantity: cartItem.quantity,
        name: cartItem.name,
      })),
      restaurantId,
      deliveryDetails: {
        ...userFormData,
        email: userFormData.email as string,
      },
    };
    try {
      const data = await createCheckOutSession(checkOutData);
      window.location.href = data.url;
    } catch (error) {
      throw new Error("Failed to create checkout session");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="inline-block  h-24 w-24 animate-spin rounded-full border-4 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </div>
    );
  }
  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const addToCart = (menuItem: MenuItemType) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === menuItem._id
    );
    let updatedItems;
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      updatedItems = updatedCartItems;
    } else {
      updatedItems = [...cartItems, { ...menuItem, quantity: 1 }];
    }
    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(updatedItems)
    );
    setCartItems(updatedItems);
  };
  const removeFromCart = (cartItemId: string) => {
    const filteredItems = cartItems.filter((item) => item._id !== cartItemId);
    sessionStorage.setItem(
      `cartItems-${restaurantId}`,
      JSON.stringify(filteredItems)
    );
    setCartItems(filteredItems);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="md:px-32">
        <AspectRatio ratio={16 / 6}>
          <img
            src={restaurant.imageUrl}
            className="object-cover w-full h-full rounded-md shadow-lg"
            alt={restaurant.restaurantName}
          />
        </AspectRatio>
      </div>

      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />

          {restaurant.menuItems.map((item) => (
            <MenuItem
              addToCart={() => addToCart(item)}
              key={item._id}
              menuItem={item}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              removeFromCart={removeFromCart}
              restaurant={restaurant}
              cartItems={cartItems}
            />
            <CardFooter>
              <CheckOutButton
                disabled={cartItems.length === 0}
                onCheckOut={onCheckOut}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
