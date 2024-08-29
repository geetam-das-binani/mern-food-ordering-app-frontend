import { OrderStatus } from "@/types/types";

type OrderStatusInfo = Array<{
  label: string;
  value: OrderStatus;
  progressValue: number;
}>;

export const order_status = [
  {
    label: "Order Placed",
    value: "Order Placed",
    progressValue: 0,
  },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "Paid",
    progressValue: 25,
  },
  {
    label: "In Progress",
    value: "In Progress",
    progressValue: 50,
  },
  {
    label: "Out For Delivery",
    value: "Out For Delivery",
    progressValue: 75,
  },
  {
    label: "Delivered",
    value: "Delivered",
    progressValue: 100,
  },
] as OrderStatusInfo;
