import { useCart } from "../context/CartContext";

export default function Orders() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return <p className="mt-4 text-gray-500">Belum ada pesanan.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Riwayat Pesanan</h2>

      {orders.map((order) => (
        <div key={order.id} className="border-b pb-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">{order.nama}</span>
            <span className="text-sm text-gray-500">{order.tanggal}</span>
          </div>
          <p className="text-gray-600">{order.alamat}</p>
          <p className="text-sm text-gray-500">Metode: {order.metode}</p>

          <div className="mt-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 font-bold text-green-600">
            Total: Rp {order.total.toLocaleString("id-ID")}
          </div>
        </div>
      ))}
    </div>
  );
}
