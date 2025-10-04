import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Gambar Produk */}
      <div className="overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover transform hover:scale-105 transition duration-300"
        />
      </div>

      {/* Info Produk */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="text-blue-600 font-bold text-lg mb-4">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        {/* Tombol Aksi */}
        <div className="mt-auto flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 text-center transition"
          >
            Lihat Detail
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
