import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, ChevronDown, ChevronUp, Package } from "lucide-react"
import axiosInstance from "../api/axios"

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [openOrder, setOpenOrder] = useState(null)

 useEffect(() => {
  axiosInstance.get("/order")
    .then((res) => {
    console.log("Orders response:", res.data)
  const data = Array.isArray(res.data) ? res.data : res.data.orders || []
  setOrders(data)
  console.log("First order:", data[0])
  console.log("First order products:", data[0]?.products)
  console.log("First product:", data[0]?.products?.[0])
})
    .catch((err) => console.error("Failed to fetch orders:", err))
    .finally(() => setLoading(false))
}, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="animate-spin h-12 w-12 text-[#23A6F0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className="font-bold text-gray-800">Home</Link>
        <ChevronRight size={16} />
        <span className="text-gray-500">Siparişlerim</span>
      </div>

      <h1 className="text-2xl font-bold text-[#252B42] mb-8">Siparişlerim</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <Package size={64} className="text-gray-300" />
          <p className="text-gray-500 text-lg">Henüz siparişiniz bulunmuyor.</p>
          <Link to="/shop" className="bg-[#23A6F0] text-white px-8 py-3 text-sm font-semibold hover:bg-blue-600 rounded">
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              
              {/* Sipariş Başlığı */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setOpenOrder(openOrder === order.id ? null : order.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <div>
                    <p className="text-xs text-gray-400">Sipariş No</p>
                    <p className="font-bold text-[#252B42] text-sm">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Tarih</p>
                    <p className="text-sm text-gray-700">
                      {new Date(order.orderDate).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Toplam</p>
                    <p className="text-sm font-bold text-orange-500">${order.price?.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Ürün Sayısı</p>
                    <p className="text-sm text-gray-700">{order.products?.length} ürün</p>
                  </div>
                </div>
                <div>
                  {openOrder === order.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>

              {/* Sipariş Detayı - Collapsable */}
              {openOrder === order.id && (
  <div className="border-t border-gray-200 p-4">
    
    {/* Desktop - Tablo */}
    <div className="hidden md:block">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-100">
            <th className="pb-2">Ürün</th>
            <th className="pb-2">Detay</th>
            <th className="pb-2 text-center">Adet</th>
            <th className="pb-2 text-right">Fiyat</th>
          </tr>
        </thead>
        <tbody>
  {order.products?.map((item, index) => (
    <tr key={index} className="border-b border-gray-50">
      <td className="py-3">
        <div className="flex items-center gap-3">
          {item.product?.images?.[0]?.url && (
            <img src={item.product.images[0].url} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
          )}
          <p className="font-semibold text-[#252B42] line-clamp-2 max-w-[200px]">
            {item.product?.name || item.detail || "Ürün"}
          </p>
        </div>
      </td>
      <td className="py-3 text-gray-500">{item.product?.description?.slice(0, 50)}...</td>
      <td className="py-3 text-center text-gray-700">{item.count}</td>
      <td className="py-3 text-right font-bold text-orange-500">
        ${item.product?.price?.toFixed(2)}
      </td>
    </tr>
  ))}
</tbody>
        <tfoot>
  <tr>
    <td colSpan={3} className="pt-4 text-right text-gray-500">Ürün Toplamı:</td>
    <td className="pt-4 text-right font-bold text-orange-500">
      ${order.products?.reduce((sum, item) => sum + (item.product?.price || 0) * item.count, 0).toFixed(2)}
    </td>
  </tr>
  <tr>
    <td colSpan={3} className="pt-1 text-right text-gray-500">Kargo:</td>
    <td className="pt-1 text-right text-gray-500">$29.99</td>
  </tr>
  <tr className="border-t border-gray-200">
    <td colSpan={3} className="pt-3 text-right font-bold text-[#252B42]">Toplam:</td>
    <td className="pt-3 text-right font-bold text-orange-500">${order.price?.toFixed(2)}</td>
  </tr>
</tfoot>
      </table>
    </div>
        {/* Mobil - Kart */}
    <div className="md:hidden flex flex-col gap-4">
      {order.products?.map((item, index) => (
        <div key={index} className="flex gap-3 border-b border-gray-100 pb-4">
          {item.images?.[0]?.url && (
            <img src={item.images[0].url} alt={item.name} className="w-16 h-16 object-cover rounded" />
          )}
          <div className="flex flex-col gap-1 flex-1">
            <p className="font-semibold text-[#252B42] text-sm">{item.name || "Ürün"}</p>
            <p className="text-xs text-gray-500">{item.description?.slice(0, 60)}...</p>
            <p className="text-xs text-gray-500">Adet: {item.count}</p>
            <p className="text-sm font-bold text-orange-500">${item.price?.toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Ürün Toplamı:</span>
          <span>${order.products?.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Kargo:</span>
          <span>$29.99</span>
        </div>
        <div className="flex justify-between font-bold text-[#252B42] border-t border-gray-200 pt-2 mt-1">
          <span>Toplam:</span>
          <span className="text-orange-500">${order.price?.toFixed(2)}</span>
        </div>
      </div>
    </div>

  </div>
)}
              
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage