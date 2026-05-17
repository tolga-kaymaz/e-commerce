import { Link } from "react-router-dom"

import ProductCard from "../components/ProductCard"
import { ChevronRight, LayoutGrid, List } from "lucide-react"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProducts, setFilter, setSort, setOffset } from "../store/reducers/productReducer"


import logo1 from "../assets/images/shop-logo-1.svg"
import logo2 from "../assets/images/shop-logo-2.svg"
import logo3 from "../assets/images/shop-logo-3.svg"
import logo4 from "../assets/images/shop-logo-4.svg"
import logo5 from "../assets/images/shop-logo-5.svg"
import logo6 from "../assets/images/shop-logo-6.svg"

function ShopPage() {

  const dispatch = useDispatch()
  const { categoryId } = useParams()
  
  const categories = useSelector((state) => state.product.categories)
  const productList = useSelector((state) => state.product.productList)
  const total = useSelector((state) => state.product.total)
  const fetchState = useSelector((state) => state.product.fetchState)
  const filter = useSelector((state) => state.product.filter)
  const sort = useSelector((state) => state.product.sort)

  const limit = useSelector((state) => state.product.limit)
const offset = useSelector((state) => state.product.offset)

const pageCount = Math.ceil(total / limit)
const currentPage = Math.floor(offset / limit)

const handlePageChange = ({ selected }) => {
  dispatch(setOffset(selected * limit))
}


  const [filterInput, setFilterInput] = useState("")
  const [sortInput, setSortInput] = useState("")

  const top5Images = categoryId
  ? [...productList]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
  : [...categories]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)

      const top5 = [...categories]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5)
  // categoryId değişince yeni istek at
  useEffect(() => {
  dispatch(fetchProducts(categoryId))
}, [categoryId, filter, sort, offset])

useEffect(() => {
  dispatch(setOffset(0))
}, [categoryId])

useEffect(() => {
  return () => {
    dispatch(setFilter(""))
    dispatch(setSort(""))
    dispatch(setOffset(0))
  }
}, [])

  const handleFilter = () => {
    dispatch(setFilter(filterInput))
    dispatch(setSort(sortInput))
  }
  return (
    <div>
     
      <div className="bg-gray-100 py-6">
  <div className="max-w-7xl mx-auto  px-4 md: px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-gray-800 font-bold">Home</Link>
          <ChevronRight size={16} />
          <span className="text-gray-500">Shop</span>
        </div>
      </div>
       </div>

      
   {!categoryId && (
  <div className="py-8 px-4 md:max-w-7xl md:mx-auto md:px-8">
    <div className="flex flex-col md:flex-row gap-4">
      {top5.map(item => (
        <div
          key={item.id}
          className="relative w-full md:flex-1 aspect-square md:aspect-auto md:h-64 overflow-hidden cursor-pointer"
        >
          <img 
            src={item.img} 
            alt={item.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm">{item.rating} rating</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


    
      {/* Filtre Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 border-t border-b border-gray-200 my-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-gray-500 text-sm">Showing {productList?.length || 0} of {total || 0} results</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Views:</span>
            <button className="p-2 border border-gray-300"><LayoutGrid size={16} /></button>
            <button className="p-2 border border-gray-300"><List size={16} /></button>
          </div>
          <div className="flex items-center gap-4">
            {/* Filter Input */}
            <input
              type="text"
              placeholder="Search products..."
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className="border border-gray-300 px-4 py-2 text-sm"
            />
            {/* Sort Select */}
            <select
              className="border border-gray-300 px-4 py-2 text-sm"
              value={sortInput}
              onChange={(e) => setSortInput(e.target.value)}
            >
              <option value="">Popularity</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white px-6 py-2 text-sm font-semibold"
            >
              Filter
            </button>
          </div>
        </div>
</div>


    
  {/* Ürün Listesi */}
<div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
  {fetchState === "FETCHING" ? (
    <div className="flex justify-center items-center py-20">
      <svg className="animate-spin h-12 w-12 text-[#23A6F0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  ) : fetchState === "FAILED" ? (
    <div className="text-center py-20 text-red-500">Failed to load products. Please try again.</div>
  ) : (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {productList?.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.images?.[0]?.url}
            title={product.name}
            department={product.description}
            price={product.price}
             discountPrice={product.discountPrice}
            colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
            gender={product.category_id}
            categoryId={product.category_id}
          />
        ))}
      </div>
      <div className="text-center mt-4 text-gray-500 text-sm">
         Showing {productList?.length || 0} of {total || 0} products
      </div>
    </>
  )}
</div>

 
{/* Pagination */}
<div className="max-w-5xl mx-auto px-8 py-8 flex justify-center gap-2">
  <button 
    onClick={() => dispatch(setOffset(0))}
    disabled={currentPage === 0}
    className="border border-gray-300 px-4 py-2 text-sm text-gray-500 disabled:opacity-50"
  >
    First
  </button>
  {Array.from({ length: pageCount }, (_, i) => (
    <button
      key={i}
      onClick={() => dispatch(setOffset(i * limit))}
      className={`border px-4 py-2 text-sm ${currentPage === i ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 text-gray-500"}`}
    >
      {i + 1}
    </button>
  ))}
  <button
    onClick={() => dispatch(setOffset((currentPage + 1) * limit))}
    disabled={currentPage === pageCount - 1}
    className="border border-gray-300 px-4 py-2 text-sm text-gray-500 disabled:opacity-50"
  >
    Next
  </button>
</div>
  
  
   <div className="bg-gray-100 py-4">
<div className="max-w-6xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex md:flex-row md:justify-between items-center gap-8">
  <img src={logo1} alt="Hooli" className="h-10 object-contain grayscale" />
  <img src={logo2} alt="Lyft" className="h-10 object-contain grayscale" />
  <img src={logo3} alt="Logo" className="h-10 object-contain grayscale" />
  <img src={logo4} alt="Stripe" className="h-10 object-contain grayscale" />
  <img src={logo5} alt="AWS" className="h-10 object-contain grayscale" />
  <img src={logo6} alt="Reddit" className="h-10 object-contain grayscale" />
</div>
</div>
      
     </div>
  )

  
}

export default ShopPage