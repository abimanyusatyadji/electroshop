import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import productsData from "../data/products.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-red-500">
          Produk tidak ditemukan
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // setiap produk bisa punya banyak gambar
  const images = product.images || [product.image];

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Slider Foto Produk */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="rounded-lg shadow-lg"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${product.name}-${index}`}
                    className="w-full h-64 sm:h-80 md:h-[400px] object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Info Produk */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            {product.description}
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-blue-600 mb-6">
            Rp{product.price.toLocaleString("id-ID")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
              Tambah ke Keranjang
            </button>
            <Link
              to="/"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 text-center transition"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
