import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Trash2, Minus, Plus, ChevronRight } from "lucide-react"
import {
  removeFromCart,
  updateCartItemCount,
  toggleCartItem,
} from "../store/reducers/shoppingCartReducer"

function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)

  const checkedItems = cart.filter((item) => item.checked)
  const totalPrice = checkedItems.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  )

  const shippingThreshold = 150
const shippingCost = totalPrice >= shippingThreshold ? 0 : 29.99
const grandTotal = totalPrice + shippingCost

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className="font-bold text-gray-800">Home</Link>
        <ChevronRight size={16} />
        <span className="text-gray-500">Cart</span>
      </div>

      <h1 className="text-2xl font-bold text-[#252B42] mb-8">
        Sepetim ({cart.length} Ürün)
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">Sepetiniz boş</p>
          <Link
            to="/shop"
            className="bg-[#23A6F0] text-white px-8 py-3 text-sm font-semibold hover:bg-blue-600"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol - Ürün Listesi */}
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => dispatch(toggleCartItem(item.product.id))}
                  className="w-5 h-5 accent-[#23A6F0] cursor-pointer"
                />

                {/* Görsel */}
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />

                {/* Bilgiler */}
                <div className="flex-1 flex flex-col gap-1">
                  <p className="text-sm font-bold text-[#252B42] line-clamp-2">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.product.description?.slice(0, 60)}...</p>
                  <p className="text-sm font-bold text-[#23A6F0]">
                    ${(item.product.price * item.count).toFixed(2)}
                  </p>
                </div>

                {/* Adet Kontrolü */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      item.count > 1
                        ? dispatch(updateCartItemCount(item.product.id, item.count - 1))
                        : dispatch(removeFromCart(item.product.id))
                    }
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.count}</span>
                  <button
                    onClick={() => dispatch(updateCartItemCount(item.product.id, item.count + 1))}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Sil */}
                <button
                  onClick={() => dispatch(removeFromCart(item.product.id))}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Sağ - Sipariş Özeti */}
          <div className="w-full lg:w-80">
            <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4 sticky top-4">
              <h2 className="text-lg font-bold text-[#252B42]">Sipariş Özeti</h2>
              
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Seçili Ürünler ({checkedItems.length})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
  <span>Kargo Toplam</span>
  <span>${shippingCost.toFixed(2)}</span>
</div>
{totalPrice >= shippingThreshold && (
  <div className="flex justify-between text-green-500">
    <span>150$ ve Üzeri Kargo Bedava</span>
    <span>-$29.99</span>
  </div>
)}
<hr />
<div className="flex justify-between font-bold text-orange-500">
  <span>Toplam</span>
  <span>${grandTotal.toFixed(2)}</span>
</div>
              </div>

              <Link
                to="/checkout"
                className="bg-orange-500 text-white text-center py-3 text-sm font-semibold hover:bg-orange-600 rounded transition-colors"
                >
                Sepeti Onayla
               </Link>

              <Link
                to="/shop"
                className="border border-gray-300 text-center py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded transition-colors"
              >
                Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage