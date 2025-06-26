import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#eae6df] text-black py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-bold uppercase mb-2 text-gray-800">Navegación</h3>
          <ul className="space-y-1">
            <li><Link to="/productos" className="hover:underline">Productos</Link></li>
            <li><Link to="/sobre-nosotros" className="hover:underline">Sobre Nosotros</Link></li>
            <li><a href={`https://wa.me/${import.meta.env.VITE_NUMBER}`} target="_blank" className="hover:underline flex items-center gap-1"><FaWhatsapp className="text-green-500" /> WhatsApp</a></li>
            <li><a href="mailto:contacto@tuempresa.com" className="hover:underline">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold uppercase mb-2 text-gray-800">Medios de Pago</h3>
          <p className="text-gray-600">Aceptamos efectivo, transferencia y más.</p>
        </div>

        <div>
          <h3 className="font-bold uppercase mb-2 text-gray-800">Contactanos</h3>
          <ul className="space-y-1 text-gray-700">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Lunes a viernes de 9 a 20 hs
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contacto@tuempresa.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Ciudad de Buenos Aires
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
