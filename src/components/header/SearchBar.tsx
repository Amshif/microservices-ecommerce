import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/hooks/useSearch";

export const SearchBar = ({ open }: { open: boolean }) => {
  const { searchQuery, handleSearch } = useSearch();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden pb-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
