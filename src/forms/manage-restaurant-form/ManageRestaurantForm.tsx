import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { Restaurant } from "@/types/types";
import { useEffect } from "react";

const menuItemSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })

    .min(3, "Name must be at least 3 characters long"),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "must be a valid number",
    })
    .min(1, "Price must be at least 1"),
});

const formSchema = z
  .object({
    restaurantName: z.string({ required_error: "Name is required" }),
    city: z.string({ required_error: "city is required" }),
    country: z.string({ required_error: "country is required" }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z
      .array(
        z
          .string({ required_error: "Cuisine type is required" })
          .min(3, "Cuisine type must be at least 3 characters long")
      )
      .nonempty({ message: "At least one cuisine is required" }),

    menuItems: z
      .array(menuItemSchema)
      .nonempty({ message: "At least one menu item is required" }),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.imageFile || data.imageUrl, {
    message: "ImageFile  or ImageUrl is required",
    path: ["imageFile"],
  });

export type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  currentRestaurant?: Restaurant | null;
};

const ManageRestaurantForm = ({
  onSave,
  isLoading,
  currentRestaurant,
}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  //* pre-populate form data
  useEffect(() => {
    if (currentRestaurant) {
      form.reset(currentRestaurant);
    }
  }, [currentRestaurant, form]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formData.append("menuItems", JSON.stringify(formDataJson.menuItems));

    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        className="p-10 space-y-8 rounded-lg bg-gray-50"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
