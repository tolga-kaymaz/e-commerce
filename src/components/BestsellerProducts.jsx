import { useEffect, useState } from "react"
import axiosInstance from "../api/axios"
import ProductCard from "./ProductCard"
import { useSelector } from "react-redux"

function BestsellerProducts() {
  const [bestsellerProducts, setProducts] = useState([])
  const categories = useSelector((state) => state.product.categories)

  useEffect(() => {
    axiosInstance.get("/products?limit=8&offset=0&sort=rating:desc")
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => console.error(err))
  }, [])
  return (
    <section className="w-full py-12">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center w-full max-w-[279px] md:max-w-[500px] mx-auto flex flex-col gap-[10px]">
          <p className="text-[14px] text-[#737373]">Featured Products</p>
          <h3 className="text-[24px] font-bold text-[#252B42]">BESTSELLER PRODUCTS</h3>
          <p className="text-[14px] text-[#737373]">Problems trying to resolve the conflict between</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-6">
          {bestsellerProducts.map((product) => (
            <div key={product.id} className="w-full md:w-[calc(25%-18px)]">
              <ProductCard
                id={product.id}
                image={product.images?.[0]?.url}
                title={product.name}
                department={product.description}
                price={product.price}
                  discountPrice={product.discountPrice}  
                colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                categoryId={product.category?.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestsellerProducts
