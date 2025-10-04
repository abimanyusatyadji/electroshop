import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart, addOrder } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    metode: "transfer",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.alamat) {
      alert("Harap lengkapi data checkout!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      nama: form.nama,
      alamat: form.alamat,
      metode: form.metode,
      items: cart,
      total: subtotal,
      tanggal: new Date().toLocaleString("id-ID"),
    };

    addOrder(newOrder); // ✅ simpan ke riwayat
    clearCart();

    alert(`Terima kasih ${form.nama}, pesananmu sedang diproses 🚀`);
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <p className="mt-4 text-gray-500">
        Keranjang kosong, silakan belanja dulu!
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Ringkasan Belanja */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Ringkasan Belanja</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
          </div>
        ))}
        <div className="flex justify-between mt-3 font-bold">
          <span>Total</span>
          <span className="text-green-600">
            Rp {subtotal.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Form Data */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Alamat</label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Metode Pembayaran</label>
          <select
            name="metode"
            value={form.metode}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="transfer">Transfer Bank</option>
            <option value="cod">COD (Bayar di Tempat)</option>
            <option value="ewallet">E-Wallet</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Bayar Sekarang
        </button>
      </form>
    </div>
  );
}
