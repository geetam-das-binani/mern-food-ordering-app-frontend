export type User = {
  email: string;
  name: string;
  city: string;
  country: string;
  addressLine1: string;
  _id: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: Array<MenuItem>;
  createdAt: string;
  updatedAt: string;
  lastUpdated:Date,
  imageUrl:string
};


export type SearchResults = {
  data: Restaurant[];
  pagination: {
    total:number,
    page:number,
    totalPages:number
  };
}

export  type CheckOutSessionrequest = {
  cartItems: Array<{
    menuItemId: string;
    name: string;

    quantity: number;
  }>;
  deliveryDetails: {
    email: string;
    city: string;
    addressLine1: string;
    name: string;
    country: string;
  };
  restaurantId: string;
};