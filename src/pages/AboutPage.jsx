import { Twitter, Facebook, Instagram, Play } from "lucide-react"

import noneImg from "../assets/images/none.png"
import videoImg from "../assets/images/video.png"
import pinkWoman from "../assets/images/pink-woman.png"

import jerome from "../assets/images/team-jerome.jpg"
import brooklyn from "../assets/images/team-brooklyn.jpg"
import floyd from "../assets/images/team-floyd.jpg"

import logo1 from "../assets/images/shop-logo-1.svg"
import logo2 from "../assets/images/shop-logo-2.svg"
import logo3 from "../assets/images/shop-logo-3.svg"
import logo4 from "../assets/images/shop-logo-4.svg"
import logo5 from "../assets/images/shop-logo-5.svg"
import logo6 from "../assets/images/shop-logo-6.svg"

const stats = [
  { value: "15K",  label: "Happy Customers" },
  { value: "150K", label: "Monthly Visitors" },
  { value: "15",   label: "Countries Worldwide" },
  { value: "100+", label: "Top Partners" },
]

const teamMembers = [
  { id: 1, name: "Username", profession: "Profession", image: jerome   },
  { id: 2, name: "Username", profession: "Profession", image: brooklyn },
  { id: 3, name: "Username", profession: "Profession", image: floyd    },
]

const logos = [
  { src: logo1, alt: "Hooli"  },
  { src: logo2, alt: "Lyft"   },
  { src: logo3, alt: "Logo"   },
  { src: logo4, alt: "Stripe" },
  { src: logo5, alt: "AWS"    },
  { src: logo6, alt: "Reddit" },
]

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <p className="text-sm font-bold text-gray-500 tracking-widest">ABOUT COMPANY</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#252B42]">ABOUT US</h1>
          <p className="text-gray-500 text-sm max-w-xs">
            We know how large objects will act, but things on a small scale
          </p>
          <button className="bg-[#23A6F0] text-white px-6 py-3 text-sm font-semibold">
            Get Quote Now
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={noneImg} alt="About Hero" className="w-full max-w-sm md:max-w-md object-contain" />
        </div>
      </div>

      {/* Text Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row gap-8 text-center md:text-left">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <p className="text-sm font-bold text-red-400">Problems trying</p>
          <h2 className="text-2xl font-bold text-[#252B42]">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
        </div>
        <div className="w-full md:w-1/2 flex items-center">
          <p className="text-gray-500 text-sm">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </div>

      {/* Stats - mobilde tek kolon */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 items-center text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <span className="text-4xl font-bold text-[#252B42]">{stat.value}</span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Video */}
      <div className="max-w-4xl mx-auto px-6 md:px-16 py-12">
        <div className="relative rounded-2xl overflow-hidden">
          <img src={videoImg} alt="Video" className="w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-[#23A6F0] rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
              <Play size={24} className="text-white ml-1" fill="white" />
            </button>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="max-w-4xl mx-auto px-6 md:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#252B42]">Meet Our Team</h2>
          <p className="text-gray-500 text-sm mt-4 max-w-sm mx-auto">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center gap-2 text-center">
              <img src={member.image} alt={member.name} className="w-full object-cover" />
              <h3 className="font-bold text-[#252B42] mt-2">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.profession}</p>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <Facebook size={18} className="text-[#23A6F0]" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <Instagram size={18} className="text-[#23A6F0]" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter size={18} className="text-[#23A6F0]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Big Companies - mobilde tek kolon */}
      <div className="py-16 px-6 md:px-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#252B42]">Big Companies Are Here</h2>
          <p className="text-gray-500 text-sm mt-4 max-w-sm mx-auto">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          {logos.map((logo) => (
            <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-10 object-contain grayscale" />
          ))}
        </div>
      </div>

      {/* Work With Us */}
      <div className="w-full flex flex-col md:flex-row min-h-[400px]">
        <div className="w-full md:w-1/2 bg-[#2A7CC7] flex flex-col justify-center gap-6 px-8 md:px-20 py-16 text-center md:text-left items-center md:items-start">
          <p className="text-sm font-bold text-blue-200 tracking-widest">WORK WITH US</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Now Let's grow Yours</h2>
          <p className="text-blue-100 text-sm max-w-xs">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
          </p>
          <button className="border border-white text-white px-6 py-3 text-sm font-semibold hover:bg-white hover:text-[#2A7CC7] transition-colors">
            Button
          </button>
        </div>
        {/* Sadece desktop */}
        <div className="hidden md:block w-1/2">
          <img src={pinkWoman} alt="Work With Us" className="w-full h-full object-cover" />
        </div>
      </div>

    </div>
  )
}

export default AboutPage