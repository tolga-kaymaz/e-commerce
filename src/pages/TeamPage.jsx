import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"

 import team1 from "../assets/images/team1.jpg"
import team2 from "../assets/images/team2.jpg"
import team3 from "../assets/images/team3.jpg"
import team4 from "../assets/images/team4.jpg"
import team5 from "../assets/images/team5.jpg"

import brooklyn from "../assets/images/team-brooklyn.jpg"
import floyd from "../assets/images/team-floyd.jpg"
import jacob from "../assets/images/team-jacob.jpg"
import jane from "../assets/images/team-jane.jpg"
import jerome from "../assets/images/team-jerome.jpg"
import leslie from "../assets/images/team-leslie.jpg"
import robert from "../assets/images/team-robert.jpg"
import ronald from "../assets/images/team-ronald.jpg"

const teamMembers = [
  { id: 1, name: "Jerome Bell",      company: "IBM",                   image: jerome  },
  { id: 2, name: "Brooklyn Simmons", company: "eBay",                  image: brooklyn },
  { id: 3, name: "Ronald Richards",  company: "Starbucks",             image: ronald  },
  { id: 4, name: "Floyd Miles",      company: "Facebook",              image: floyd   },
  { id: 5, name: "Jane Cooper",      company: "Mitsubishi",            image: jane    },
  { id: 6, name: "Robert Fox",       company: "IBM",                   image: robert  },
  { id: 7, name: "Leslie Alexander", company: "The Walt Disney Company", image: leslie },
  { id: 8, name: "Jacob Jones",      company: "Starbucks",             image: jacob   },
]

function TeamPage() {
  return (
    <div>
      
      <div className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Team</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-800 font-bold">Home</Link>
            <ChevronRight size={16} />
            <span className="text-gray-500">Team</span>
          </div>
        </div>
      </div>


      <div>
  {/* Başlık */}
  <div className="text-center py-12 px-4">
    <p className="text-sm font-bold text-gray-500 tracking-widest mb-3">WHAT WE DO</p>
    <h1 className="text-3xl md:text-5xl font-bold text-[#252B42]">Innovation tailored for you</h1>
    
  </div>

  {/* Fotoğraf Kolaj */}
 <div className="w-full flex flex-col md:flex-row h-auto md:h-[600px]">
  
  {/* Büyük görsel */}
  <div className="w-full md:w-1/2 h-[400px] md:h-full">
    <img src={team1} alt="team" className="w-full h-full object-cover" />
  </div>

  {/* 2x2 grid */}
  <div className="w-full md:w-1/2 h-auto md:h-full grid grid-cols-2 grid-rows-2">
    <img src={team3} alt="team" className="w-full h-[200px] md:h-full object-cover" />
    <img src={team5} alt="team" className="w-full h-[200px] md:h-full object-cover" />
    <img src={team2} alt="team" className="w-full h-[200px] md:h-full object-cover" />
    <img src={team4} alt="team" className="w-full h-[200px] md:h-full object-cover" />
  </div>

</div>
</div>

      
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#252B42]">Meet Our Team</h2>
          <p className="text-gray-500 text-sm mt-4 max-w-sm mx-auto">
            Problems trying to resolve the conflict between <br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 md:px-0">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col gap-2">
              <img
                src={member.image}
                alt={member.name}
                className="w-full object-cover"
              />
              <div className="flex flex-col gap-1 mt-2">
                <h3 className="text-lg font-bold text-[#252B42]">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.company}</p>
                <div className="flex items-center gap-3 mt-2">
  <a href="https://facebook.com" target="_blank" rel="noreferrer">
    <FaFacebook size={16} className="text-[#23A6F0] hover:opacity-75" />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noreferrer">
    <FaInstagram size={16} className="text-[#23A6F0] hover:opacity-75" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noreferrer">
    <FaTwitter size={16} className="text-[#23A6F0] hover:opacity-75" />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
    <FaLinkedin size={16} className="text-[#23A6F0] hover:opacity-75" />
  </a>
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamPage