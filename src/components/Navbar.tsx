import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Trenly</h1>
        <nav className="space-x-6 text-sm text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <a href="#products" className="hover:text-indigo-600">Produk</a>
          <a href="#contact" className="hover:text-indigo-600">Kontak</a>
        </nav>
      </div>
    </header>
  );
}
