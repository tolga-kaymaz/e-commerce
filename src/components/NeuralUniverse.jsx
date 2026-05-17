const coupleImage = "https://plus.unsplash.com/premium_photo-1727967288236-bd02a82b67e4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGZhc2hpb24lMjBjb3VwbGV8ZW58MHx8MHx8fDA%3D"
import { Link } from "react-router-dom"

function NeuralUniverse() {
  return (
     <section className="w-full ">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row gap-8 items-center md:gap-16">
          <div className="w-full h-[410px] md:w-[704px] md:h-[682px] flex items-end justify-center px-2 md:px-0">
            <img
              src={coupleImage}
              alt="Part of the Neural Universe"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-[510px] flex flex-col gap-4 text-center md:text-left items-center md:items-start pb-6 md:pb-0">
            <p className="text-[14px] text-[#BDBDBD] tracking-widest">
              SUMMER 2020
            </p>
            <h3 className="text-[40px] leading-[50px] font-bold tracking-[0.2px] text-[#252B42] max-w-[303px] md:max-w-none mx-auto md:mx-0">
              Part of the Neural Universe
            </h3>
            <p className="text-[20px] leading-[30px] font-normal tracking-[0.2px] text-[#737373] max-w-[262px] md:max-w-md mx-auto md:mx-0">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-[10px] sm:gap-4">
             <Link to="/shop" className="w-[151px] py-[15px] bg-[#23A6F0] text-white text-sm font-semibold rounded-[5px] text-center">
  BUY NOW
</Link>
              <button className="w-[151px] py-[15px] border border-[#23A6F0] text-[#23A6F0] text-sm font-semibold rounded-[5px] text-center">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default NeuralUniverse