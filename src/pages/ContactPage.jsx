import { Twitter, Facebook, Instagram, Linkedin, Phone, MapPin, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import contactHero from "../assets/images/contact-hero.png"

const contactCards = [
  {
    id: 1,
    icon: <Phone size={40} className="text-[#23A6F0] mb-4" strokeWidth={1.5} />,
    email1: "georgia.young@example.com",
    email2: "georgia.young@ple.com",
    label: "Get Support",
    dark: false,
  },
  {
    id: 2,
    icon: <MapPin size={40} className="text-[#23A6F0] mb-4" strokeWidth={1.5} />,
    email1: "georgia.young@example.com",
    email2: "georgia.young@ple.com",
    label: "Get Support",
    dark: true,
  },
  {
    id: 3,
    icon: <Mail size={40} className="text-[#23A6F0] mb-4" strokeWidth={1.5} />,
    email1: "georgia.young@example.com",
    email2: "georgia.young@ple.com",
    label: "Get Support",
    dark: false,
  },
]

function ContactPage() {
  return (
       <div>
      {/* Hero Section */}
<div className="max-w-7xl mx-auto px-6 md:px-16 py-16 flex flex-col md:flex-row items-center gap-8 md:min-h-[400px]">
  
  {/* Sol - Metin - SADECE items-center ve text-center eklendi */}
  <div className="w-full md:w-1/2 flex flex-col gap-6 items-center md:items-start text-center md:text-left">
    <p className="text-sm font-bold text-gray-500 tracking-widest">CONTACT US</p>
    <h1 className="text-4xl md:text-6xl font-bold text-[#252B42] leading-tight">
      Get in touch <br /> today!
    </h1>
    <p className="text-gray-500 text-sm max-w-xs">
      We know how large objects will act, but things on a small scale
    </p>
    <div className="flex flex-col gap-3">
      <p className="font-bold text-[#252B42]">Phone : +451 215 215</p>
      <p className="font-bold text-[#252B42]">Fax : +451 215 215</p>
    </div>
    {/* justify-center eklendi */}
    <div className="flex items-center gap-5 justify-center md:justify-start">
      <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
        <Twitter size={24} className="text-[#252B42] hover:text-blue-400 transition-colors" />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
        <Facebook size={24} className="text-[#252B42] hover:text-blue-600 transition-colors" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
        <Instagram size={24} className="text-[#252B42] hover:text-pink-500 transition-colors" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <Linkedin size={24} className="text-[#252B42] hover:text-blue-700 transition-colors" />
      </a>
    </div>
  </div>

  {/* Sağ - Görsel - Desktop aynen korundu, mobil için minHeight düşürüldü */}
  <div className="w-full md:w-1/2 min-h-[400px] md:min-h-[700px]">
    <img
      src={contactHero}
      alt="Contact Hero"
      className="w-full h-full object-cover object-right"
      style={{ minHeight: "inherit" }}
    />
  </div>
</div>
     {/* Visit Our Office Section */}
      <div className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm font-bold text-gray-500 tracking-widest mb-3">VISIT OUR OFFICE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#252B42]">
            We help small businesses <br /> with big ideas
          </h2>
        </div>

        {/* Kartlar - mobilde alt alta, desktop'ta yan yana */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center">
          {contactCards.map((card) => (
            <div
              key={card.id}
              className={`flex-1 flex flex-col items-center text-center px-8
                ${card.dark
                  ? "bg-[#252B42] text-white md:-my-8 z-10"
                  : "bg-white border border-gray-200"
                }`}
              style={{
                minHeight: card.dark ? "420px" : "340px",
                paddingTop: card.dark ? "60px" : "40px",
                paddingBottom: card.dark ? "60px" : "40px",
              }}
            >
              {card.icon}
              <p className={`text-sm mt-4 ${card.dark ? "text-gray-300" : "text-gray-500"}`}>{card.email1}</p>
              <p className={`text-sm mb-4 ${card.dark ? "text-gray-300" : "text-gray-500"}`}>{card.email2}</p>
              <p className={`font-bold text-sm mb-4 ${card.dark ? "text-white" : "text-gray-800"}`}>{card.label}</p>
              <button className="border border-[#23A6F0] text-[#23A6F0] px-6 py-2 rounded-full text-sm hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Let's Talk CTA */}
      <div className="py-20 flex flex-col items-center text-center gap-4">
        {/* Ok ikonu */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4 C24 4, 36 16, 24 44" stroke="#23A6F0" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M18 36 L24 44 L30 36" stroke="#23A6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <p className="text-sm font-bold text-gray-500 tracking-widest">WE Can&apos;t WAIT TO MEET YOU</p>
        <h2 className="text-5xl font-bold text-gray-900">Let&apos;s Talk</h2>
        <button className="mt-2 bg-[#23A6F0] text-white px-10 py-3 rounded text-sm font-semibold hover:bg-blue-600 transition-colors">
          Try it free now
        </button>
      </div>
    </div>
  )
}

export default ContactPage