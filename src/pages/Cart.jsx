import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <p className="mt-6 text-center text-gray-500 text-lg">
        Keranjang masih kosong 🛒
      </p>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Keranjang Belanja</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4"
          >
            {/* Kiri: Gambar + Info */}
            <div className="flex items-center gap-3">
              <img
                src={item.images ? item.images[0] : item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div>
                <h3 className="font-medium text-sm sm:text-base">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Kanan: Qty + Hapus */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              {/* Qty control */}
              <div className="flex items-center border rounded-lg overflow-hidden w-fit">
                <button
                  onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-sm sm:text-base"
                >
                  −
                </button>
                <input
                  type="number"
                  value={item.qty}
                  min="1"
                  onChange={(e) =>
                    updateQty(item.id, parseInt(e.target.value) || 1)
                  }
                  className="w-12 sm:w-14 text-center border-x text-sm sm:text-base"
                />
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-sm sm:text-base"
                >
                  +
                </button>
              </div>

              {/* Hapus */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm sm:text-base"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <span className="font-semibold text-base sm:text-lg">Total:</span>
        <span className="text-lg sm:text-xl font-bold text-green-600">
          Rp {subtotal.toLocaleString("id-ID")}
        </span>
      </div>

      {/* Aksi */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={clearCart}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm sm:text-base"
        >
          Kosongkan
        </button>
        <Link
          to="/checkout"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center text-sm sm:text-base"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
