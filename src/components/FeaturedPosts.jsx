import { ChevronRight, Clock } from "lucide-react"
import post1 from "../assets/images/unsplash_hHdHCfAifHU.png"
import post2 from "../assets/images/unsplash_tVEqStC2uz8.png"
import post3 from "../assets/images/unsplash_dEGu-oCuB1Y.png"

const posts = [
  { id: 1, image: post1, title: "Loudest à la Madison #1 (L'integral)", description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.", date: "22 April 2021", comments: 10 },
  { id: 2, image: post2, title: "Loudest à la Madison #1 (L'integral)", description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.", date: "22 April 2021", comments: 10 },
  { id: 3, image: post3, title: "Loudest à la Madison #1 (L'integral)", description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.", date: "22 April 2021", comments: 10 },
]

function FeaturedPosts() {
  return (
    <section className="w-full py-1 bg-white min-h-[800px]">
      <div className="w-full max-w-8xl mx-auto px-4">
        <div className="text-center">
          <p className="text-[14px] text-[#23A6F0]">Practice Advice</p>
          <h3 className="text-[40px] leading-[50px] font-bold tracking-[0.2px] text-[#252B42] mt-2">
            Featured Posts
          </h3>
          <p className="text-[14px] text-[#737373] mt-2 max-w-[469px] mx-auto">
            Problems trying to resolve the conflict between
            <br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-8 justify-center">
          {posts.map((post) => (
            <article key={post.id} className="bg-white shadow-sm w-[330px] max-w-full">
              <div className="relative">
                <img src={post.image} alt={post.title} className="w-full h-[200px] object-cover" />
                <span className="absolute top-4 left-4 bg-[#E74040] text-white text-xs px-3 py-1">NEW</span>
              </div>
              <div className="px-[25px] pt-[25px] pb-[35px] flex flex-col gap-[10px]">
                <div className="flex items-center gap-3 text-[12px] text-[#737373]">
                  <span className="text-[#23A6F0]">Google</span>
                  <span>Trending</span>
                  <span>New</span>
                </div>
                <h4 className="text-[20px] leading-[30px] font-normal text-[#252B42] max-w-[247px]">
                  {post.title}
                </h4>
                <p className="text-[14px] leading-[20px] text-[#737373] max-w-[280px]">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-[12px] text-[#737373]">
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-[#23A6F0]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    💬 {post.comments} comments
                  </span>
                </div>
                <button className="flex items-center gap-1 text-[14px] font-semibold text-[#737373]">
                  Learn More <ChevronRight className="text-[#23A6F0]" size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedPosts
