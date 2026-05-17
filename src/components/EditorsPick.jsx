const menImage = "https://static.lefties.com/assets/public/31fd/34cd/19aa42dba705/48fa965a7fb2/0190054625001-A9/0190054625001-A9.jpg?ts=1776698057733&w=1291&f=auto"
const womenImage = "https://static.lefties.com/assets/public/0515/265d/f29943c993ba/7778cca1bc4f/01670306800-A5/01670306800-A5.jpg?ts=1773388942115&w=971&f=auto"
const accessoriesImage = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
const kidsImage = "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800"
import { Link } from "react-router-dom"

function EditorsPick() {
  return (
  <section className="w-full py-12">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4 px-4">
          <div className="text-center w-full max-w-[607px] flex flex-col gap-[10px] md:max-w-none">
            <h3 className="text-[24px] font-bold text-[#252B42] leading-[32px]">
              EDITOR&apos;S PICK
            </h3>
            <p className="text-[14px] text-[#737373] leading-[20px] md:max-w-[347px] mx-auto">
              Problems trying to resolve the conflict between
            </p>
          </div>

          <div className="w-full flex flex-col gap-6 md:flex-row md:justify-center">
           <Link to="/shop/erkek/tişört/1" className="group relative w-[324px] h-[500px] md:w-[510px] md:h-[500px] mx-auto">
  <img src={menImage} alt="men" className="w-full h-full object-cover group-hover:opacity-90" />
  <span className="absolute left-4 bottom-4 bg-white px-6 py-2 text-sm font-bold text-[#252B42] group-hover:bg-[#252B42] group-hover:text-white transition-colors">
    MEN
  </span>
</Link>

            <Link to="/shop/kadin/tişört/2" className="group relative w-[324px] h-[500px] md:w-[240px] md:h-[500px] mx-auto">
  <img src={womenImage} alt="women" className="w-full h-full object-cover group-hover:opacity-90" />
  <span className="absolute left-4 bottom-4 bg-white px-6 py-2 text-sm font-bold text-[#252B42] group-hover:bg-[#252B42] group-hover:text-white transition-colors">
    WOMEN
  </span>
</Link>

            <div className="w-full md:w-[240px] flex flex-col gap-4">
              <button
                type="button"
                className="group relative w-[325px] h-[242px] md:w-full md:h-[242px] mx-auto"
              >
                <img
                  src={accessoriesImage}
                  alt="accessories"
                  className="w-full h-full object-cover group-hover:opacity-90"
                />
                <span className="absolute left-4 bottom-4 bg-white px-5 py-2 text-sm font-bold text-[#252B42] group-hover:bg-[#252B42] group-hover:text-white transition-colors">
                  ACCESSORİES
                </span>
              </button>
              <button
                type="button"
                className="group relative w-[325px] h-[242px] md:w-full md:h-[242px] mx-auto"
              >
                <img
                  src={kidsImage}
                  alt="kids"
                  className="w-full h-full object-cover group-hover:opacity-90"
                />
                <span className="absolute left-4 bottom-4 bg-white px-5 py-2 text-sm font-bold text-[#252B42] group-hover:bg-[#252B42] group-hover:text-white transition-colors">
                  KIDS
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default EditorsPick