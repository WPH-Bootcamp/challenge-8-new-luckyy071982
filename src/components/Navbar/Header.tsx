import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { NavMenu } from "./NavMenu";
import { SearchMenu } from "./SearchMenu";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const isActive = (path: string) => location.pathname === path;

  const handleDesktopSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="px-8 py-4 md:px-16 lg:px-24 xl:px-32 flex justify-between items-center">
          <div className="flex items-center sm:gap-10 md:gap-20">
            <Link to="/" className="flex items-center p-0.5 group">
              <img
                src="/src/assets/icons/Logo.svg"
                alt="Logo"
                className="w-6 mr-2 group-hover:scale-110 transition-transform"
              />
              <span className="text-xl font-semibold text-white">Movie</span>
            </Link>

            <nav className="hidden sm:flex sm:gap-10 md:gap-14 text-[16px] font-medium">
              <Link
                to="/"
                className={`transition-colors duration-300 ${
                  isActive("/")
                    ? "text-red-500 font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className={`transition-colors duration-300 ${
                  isActive("/favorites")
                    ? "text-red-500 font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Favorites
              </Link>
            </nav>
          </div>

          <div className="flex items-center">
            <div className="relative hidden sm:flex items-center">
              <Search className="absolute left-3 text-[#717680]" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleDesktopSearch}
                placeholder="Search Movie"
                className="bg-[#0A0D12] text-white text-[16px] w-64 h-11 rounded-xl outline-none border border-white/10 pl-10 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-[#717680]"
              />
            </div>

            <div className="flex items-center sm:hidden">
              <button onClick={toggleSearch} className="p-2 cursor-pointer">
                <img
                  src="/src/assets/icons/Search.svg"
                  alt="Search"
                  className="w-6 mr-4"
                />
              </button>
              <button onClick={toggleMenu} className="p-2 cursor-pointer">
                <img
                  src="/src/assets/icons/Menu.svg"
                  alt="Menu"
                  className="w-6"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <NavMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <SearchMenu
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
