import { useFieldArray, useFormContext } from "react-hook-form";
import { RestaurantFormData } from "./ManageRestaurantForm";
import { FormDescription} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext<RestaurantFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Add menu items for your restaurant. You can add multiple menu items.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <MenuItemInput
            key={field.id}
            index={index}
            removeMenuItem={() => remove(index)}
          />
        ))}
      </div>

      <Button type="button" onClick={() => append({ name: "", price: 0 })}>
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
