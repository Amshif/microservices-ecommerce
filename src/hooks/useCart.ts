import { useAppSelector } from "@/store/hooks";

export const useCart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  return { cartItems, itemCount };
};
