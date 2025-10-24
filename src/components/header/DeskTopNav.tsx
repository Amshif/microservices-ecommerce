import { Link } from "react-router-dom";
import { navLinks } from "./navConfig";

export const DesktopNav = () => (
  <nav className="hidden md:flex items-center space-x-6">
    {navLinks.map(({ path, label }) => (
      <Link
        key={path}
        to={path}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        {label}
      </Link>
    ))}
  </nav>
);
