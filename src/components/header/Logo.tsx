import { Link } from "react-router-dom";

export const Logo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
    <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
      ShopHub
    </span>
  </Link>
);
