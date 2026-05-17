import { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Star, ArrowLeft } from "lucide-react"
import { fetchProduct } from "../store/reducers/productReducer"
import { addToCart } from "../store/reducers/shoppingCartReducer"


function ProductDetailPage() {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const product = useSelector((state) => state.product.selectedProduct)
  const fetchState = useSelector((state) => state.product.fetchState)

  const [currentImage, setCurrentImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)

  

  const colors = ["#23A6F0", "#23856D", "#E77C40", "#252B42"]

  useEffect(() => {
    dispatch(fetchProduct(productId))
  }, [productId])

  if (fetchState === "FETCHING") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="animate-spin h-12 w-12 text-[#23A6F0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    )
  }

  if (!product) return null

  const images = product.images || []

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-2 text-sm">
          <Link to="/" className="font-bold text-gray-800">Home</Link>
          <ChevronRight size={16} />
          <Link to="/shop" className="text-gray-500">Shop</Link>
          <ChevronRight size={16} />
          <span className="text-gray-500">{product.name}</span>
        </div>
      </div>

      {/* Geri Butonu */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <button
          onClick={() => history.goBack()}
          className="flex items-center gap-2 text-[#23A6F0] hover:text-blue-700 text-sm font-semibold"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Ürün Detay */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">
          
          {/* Sol - Görseller */}
          <div className="w-full md:w-1/2">
            <div className="relative h-[500px] overflow-hidden bg-gray-50 flex items-center justify-center">
              {images.length > 0 ? (
                <img src={images[currentImage]?.url} alt={product.name} className="h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Küçük Görseller */}
            <div className="flex gap-2 mt-2">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 overflow-hidden cursor-pointer border-2 ${currentImage === index ? "border-blue-500" : "border-transparent"}`}
                >
                  <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Sağ - Bilgiler */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i <= Math.round(product.rating) ? "currentColor" : "none"}
                    className={i <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm">{product.sell_count} Reviews</span>
            </div>

            {/* Fiyat */}
            <p className="text-2xl font-bold text-gray-800">${product.price}</p>

            {/* Stok */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Availability :</span>
              <span className={product.stock > 0 ? "text-blue-500 font-semibold" : "text-red-500 font-semibold"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Açıklama */}
            <p className="text-gray-500 text-sm">{product.description}</p>

            <hr />

            {/* Renkler */}
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-6 h-6 rounded-full border-2 ${selectedColor === index ? "border-gray-800" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Butonlar */}
           <div className="flex items-center gap-4 mt-2">
            <button
             onClick={() => dispatch(addToCart(product))}
            className="bg-blue-500 text-white px-6 py-2 text-sm font-semibold"
              >
             Add to Cart
            </button>
           <button className="border border-gray-300 p-2 rounded-full">
           <Heart size={18} />
          </button>
           <button className="border border-gray-300 p-2 rounded-full">
         <ShoppingCart size={18} />
         </button>
          </div>
          </div>
        </div>
      </div>

      {/* Description Tab */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="flex border-b border-gray-300 gap-8">
          <button className="pb-4 text-sm font-semibold border-b-2 border-gray-800">Description</button>
          <button className="pb-4 text-sm text-gray-500">Additional Information</button>
          <button className="pb-4 text-sm text-gray-500">Reviews ({product.sell_count})</button>
        </div>
        <div className="py-8">
          <p className="text-gray-500 text-sm">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage