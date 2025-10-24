import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/store/slices/productsSlice";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchQuery = useAppSelector((s) => s.products.searchQuery);

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value));
    if (value && window.location.pathname !== "/products") {
      navigate("/products");
    }
  };

  return { searchQuery, handleSearch };
};
