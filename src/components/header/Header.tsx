import { useState } from "react";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { SearchBar } from "./SearchBar";
import { HeaderActions } from "./HeaderActions";
import { MobileNav } from "./MobileNav";

export const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Logo />
        <DesktopNav />
        <HeaderActions
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>

      <SearchBar open={searchOpen} />
      <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
};
