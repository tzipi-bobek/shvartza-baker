import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-10 text-center space-y-12">
      <div className="w-screen max-w-full overflow-hidden">
        <video
          src="/home-banner.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover object-center h-auto md:h-[300px] lg:h-[350px] xl:h-[400px]"
        />
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4">Sandwiches kasher con sabor a casa</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          En <strong>Shvartza Baker</strong> elaboramos productos lácteos y parve con recetas familiares y supervisión kasher.
        </p>
      </div>

      <div>
        <Link
          to="/productos"
          className="
            inline-block
            border border-[#d6d0c4]
            px-6 py-3
            font-serif text-lg
            transition-colors
            hover:bg-[#f2f0eb]
          "
        >
          Ver productos
        </Link>
      </div>

      <div className="text-sm text-gray-600 max-w-md mx-auto">
        Todos nuestros productos cuentan con supervisión del <strong>Rab Bobek</strong>.
        Elaborados con dedicación, tradición y mucho amor.
      </div>
    </div>
  );
};

export default Home;
