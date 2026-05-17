import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import heroImage from "../assets/images/shop-hero-1-product-slide-1.jpg"
import { Link } from "react-router-dom"


const slides = [
  {
    id: 1,
    subtitle: "SUMMER 2026",
    title: "NEW COLLECTION",
    description: "We know how large objects will act, but things on a small scale.",
    buttonText: "SHOP NOW",
    
    image:"https://static.zara.net/assets/public/fcde/4408/aa204ad0af84/a5fc271de321/image-landscape-fill-f2a28695-baa6-4550-b6bf-27b2c7feac73-default_0/image-landscape-fill-f2a28695-baa6-4550-b6bf-27b2c7feac73-default_0.jpg?ts=1778505842790&w=3380",
  },
  {
    id: 2,
    subtitle: "SUMMER 2026",
    title: "NEW COLLECTION",
    description: "We know how large objects will act, but things on a small scale.",
    buttonText: "SHOP NOW",
    image: "https://static.lefties.com/assets/public/6b4c/9565/a82b47cc9511/7d008fa2d9bf/D_1/D_1.jpg?ts=1778511291836&w=3380",
  },
]

function HeroSlider() {
  const [current, setCurrent] = useState(0)

  return (
<div className="relative w-full min-h-[750px] overflow-hidden flex items-center">
  
  
  <img 
  src={slides[current].image} 
  alt="hero" 
  className="absolute inset-0 w-full h-full object-cover object-top"
/>


  
  <button
    onClick={() => setCurrent(current === 0 ? slides.length - 1 : current - 1)}
    className="text-white absolute left-4 top-1/2 -translate-y-1/2 z-10"
  >
    <ChevronLeft size={40} />
  </button>

  
  <div className="relative z-10 w-full flex items-center justify-center md:justify-start min-h-[750px] px-4 md:px-24">
  <div className="text-white text-center md:text-left max-w-sm md:ml-64">
    <p className="text-sm mb-2">{slides[current].subtitle}</p>
    <h1 className="text-3xl md:text-5xl font-bold mb-4"  style={{ WebkitTextStroke: "1px black" }} >{slides[current].title}</h1>
    <p className="mb-6">{slides[current].description}</p>
    <Link to="/shop" className="bg-green-500 text-white px-6 py-3 font-semibold">
  SHOP NOW
</Link>
  </div>
</div>

  
  <button
    onClick={() => setCurrent(current === slides.length - 1 ? 0 : current + 1)}
    className="text-white absolute right-4 top-1/2 -translate-y-1/2 z-10"
  >
    <ChevronRight size={40} />
  </button>

  
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrent(index)}
        className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-white/50"}`}
      />
    ))}
  </div>
</div>
  )
}

export default HeroSlider