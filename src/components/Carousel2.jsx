import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
const heroImage1 ="https://static.lefties.com/assets/public/8829/bef1/041d48b7a618/7a0f322e3921/01990509710-A1/01990509710-A1.jpg?ts=1774424974193&w=971&f=auto"
const heroImage2 ="https://static.lefties.com/assets/public/4421/deee/5feb4b08adfd/a13c48453ab9/01920545737-01-A9/01920545737-01-A9.jpg?ts=1772533856785&w=1291&f=auto"
import { Link } from "react-router-dom"

const slides = [
  {
    id: 1,
    subtitle: "SUMMER 2026",
    title: "Vita Classic \n Product",
    description: "We know how large objects will act. We know how are objects will act. We know",
    price: "$16.48",
    buttonText: "ADD TO CART",
    image: heroImage1,
  },
 
  {
    id: 2,
    subtitle: "SUMMER 2026",
    title: "Vita Classic \n Product",
    description: "We know how large objects will act. We know how are objects will act. We know",
    price: "$16.48",
    buttonText: "ADD TO CART",
    image: heroImage2,
  },
]

function Carousel2() {
  const [current, setCurrent] = useState(0)

  return (
  <section className="relative w-full bg-gray-500 overflow-hidden">
  
  {/* Mobil */}
  <div className="flex flex-col items-center text-white text-center px-8 pt-16 pb-0 md:hidden">
    <p className="text-sm mb-2">{slides[current].subtitle}</p>
    <h2 className="text-3xl font-bold mb-4">Vita Classic <br /> Product</h2>
    <p className="mb-4 text-gray-200">{slides[current].description}</p>
    <span className="text-2xl font-bold mb-4">{slides[current].price}</span>
    <Link to="/shop" className="bg-green-500 text-white px-8 py-3 font-semibold">
  ADD TO CART
</Link>
    <img src={slides[current].image} alt="product" className="w-[70%] object-contain mt-4" />
  </div>

  {/* Desktop */}
  <div className="hidden md:flex items-center min-h-[800px] px-64 relative">
    <img src={slides[current].image} alt="product" className="absolute right-64 bottom-0 h-[100%] object-contain" />
    <div className="text-white max-w-md">
      <p className="text-sm mb-2">{slides[current].subtitle}</p>
      <h2 className="text-5xl font-bold mb-4">Vita Classic <br /> Product</h2>
      <p className="mb-6 text-gray-200">{slides[current].description}</p>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold">{slides[current].price}</span>
        <Link to="/shop" className="bg-green-500 text-white px-6 py-3 font-semibold">
            ADD TO CART
       </Link>
      </div>
    </div>
  </div>

  
  <button onClick={() => setCurrent(current === 0 ? slides.length - 1 : current - 1)} className="text-white absolute left-4 top-1/2 -translate-y-1/2 z-10">
    <ChevronLeft size={40} />
  </button>
  <button onClick={() => setCurrent(current === slides.length - 1 ? 0 : current + 1)} className="text-white absolute right-4 top-1/2 -translate-y-1/2 z-10">
    <ChevronRight size={40} />
  </button>

  
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
    {slides.map((_, index) => (
      <button key={index} onClick={() => setCurrent(index)} className={`w-6 h-2 rounded-full ${current === index ? "bg-white" : "bg-white/50"}`} />
    ))}
  </div>
</section>
  )
}

export default Carousel2