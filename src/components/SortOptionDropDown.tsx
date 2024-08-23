
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOption:string
};

const SORT_OPTIONS = [
  {
    label: "Best Match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },{
    label:"None",
    value:"none"
  }
];

const SortOptionDropDown = ({ onChange,sortOption }: Props) => {
 
  const isSelectedSortLabel= SORT_OPTIONS.find((option) => option.value === sortOption)?.label ?? "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant={"outline"}>Sort by : {isSelectedSortLabel}</Button>
        </DropdownMenuTrigger>
      
      <DropdownMenuContent >
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
          
            onClick={() => {
              onChange(option.value);
             
            }}
            className="cursor-pointer w-[200px]"
            key={option.value}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropDown;
