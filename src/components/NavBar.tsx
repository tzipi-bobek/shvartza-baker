import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from '@assets/Logo.svg?react';
import LogoKosher from '@assets/LogoKosher.svg?react';
import CartIcon from "./CartIcon";

const navLinks = [
  { path: "/", label: "Inicio" },
  { path: "/productos", label: "Productos" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#eae6df] text-black fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[7.5rem] items-center justify-between">

          <div className="flex items-center gap-2">
            <Link to="/">
              <Logo className="h-24 w-auto cursor-pointer" />
            </Link>
            <LogoKosher className="h-10 w-auto fill-green-500" />
          </div>

          <div className="sm:hidden flex items-center gap-4">
            <CartIcon />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Abrir o cerrar menú"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden sm:flex gap-6 text-lg font-medium items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="hover:underline hover:text-gray-700 transition"
              >
                {link.label}
              </NavLink>
            ))}
            <CartIcon />
          </div>
        </div>
      </div>

      <div className={`${menuOpen ? "block" : "hidden"} sm:hidden bg-[#eae6df] border-t border-[#dcd7cf] px-4 pb-4 pt-2`}>
        <div className="flex flex-col gap-2 text-lg font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="hover:underline hover:text-gray-700 transition"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
