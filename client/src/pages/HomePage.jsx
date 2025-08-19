import React from "react";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";
import {products} from "../product"; 


const Navbar = () => {
  const { getCartCount } = useCart();
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-blue-600">MyShop</h1>
      <div className="relative">
        <Link to="/cart" className="text-xl">Cart</Link>
        {getCartCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {getCartCount()}
          </span>
        )}
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="bg-blue-100 text-center py-16 px-4">
    <h2 className="text-4xl font-bold mb-4">Welcome to MyShop</h2>
    <p className="text-gray-700 mb-6">
      The best place to Learn payment integration
    </p>
    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
      Shop Now
    </button>
  </section>
);

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

const ProductGrid = () => (
  <section className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </section>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ProductGrid />
    </div>
  );
}
