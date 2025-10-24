import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { navLinks } from "./navConfig";
import { useSearch } from "@/hooks/useSearch";

export const MobileNav = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t md:hidden overflow-hidden"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className="text-sm font-medium py-2"
              >
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
