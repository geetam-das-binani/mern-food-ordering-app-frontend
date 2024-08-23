import { MenuItem as MenuItemType } from "@/types/types"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

type Props={
    menuItem:MenuItemType,
    addToCart:()=>void
}

const MenuItem = ({menuItem,addToCart}:Props) => {
  return (
    <Card onClick={addToCart} className="cursor-pointer hover:scale-105 hover:ease-in-out hover:duration-300">
      <CardHeader>
        <CardTitle>
          {menuItem.name}
        </CardTitle>
        <CardDescription className="text-xl font-bold text-black">
            ₹ {menuItem.price.toFixed(2)}
        </CardDescription>
        
      </CardHeader>
    </Card>
  )
}

export default MenuItem
