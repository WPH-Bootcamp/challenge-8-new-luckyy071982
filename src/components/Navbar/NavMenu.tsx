import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`fixed inset-0 bg-[#0a0a0a] z-[100] transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 logic-in-out sm:hidden`}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center p-0.5">
            <img
              src="/src/assets/icons/Logo.svg"
              alt="Logo"
              className="w-6 mr-2"
            />
            <span className="text-xl font-semibold text-white">Movie</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="cursor-pointer"
          >
            <X size={32} className="text-white" />
          </button>
        </div>

        <nav className="flex flex-col gap-8 mt-12 text-2xl font-medium">
          <Link
            to="/"
            onClick={onClose}
            className={`transition-all duration-300 ${
              isActive("/")
                ? "text-red-600 font-bold"
                : "text-white/60 hover:text-white"
            }`}
          >
            Home
          </Link>

          <Link
            to="/favorites"
            onClick={onClose}
            className={`transition-all duration-300 ${
              isActive("/favorites")
                ? "text-red-600 font-bold"
                : "text-white/60 hover:text-white"
            }`}
          >
            Favorites
          </Link>
        </nav>

        <div className="mt-auto pb-10">
          <p className="text-white/20 text-sm italic">© 2026 Movie Explorer</p>
        </div>
      </div>
    </div>
  );
};
