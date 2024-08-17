import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  
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

const SortOptionDropDown = ({ onChange }: Props) => {
  const [labelIndex, setLabelIndex] = useState<null | number>(null);
  const handleSelectedSortLabel = () => {
    if (labelIndex === null) return "";
    return SORT_OPTIONS[labelIndex].label;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant={"outline"}>Sort by : {handleSelectedSortLabel()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        {SORT_OPTIONS.map((option, index) => (
          <DropdownMenuItem
          
            onClick={() => {
              onChange(option.value);
              setLabelIndex(index);
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
