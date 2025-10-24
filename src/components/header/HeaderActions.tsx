import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

interface HeaderActionsProps {
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export const HeaderActions = ({
  searchOpen,
  setSearchOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderActionsProps) => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-2">
      {/* Search */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSearchOpen(!searchOpen)}
        className="hidden md:flex"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Cart */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/cart")}
        className="relative"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {itemCount}
          </span>
        )}
      </Button>

      {/* Mobile Menu */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
};
