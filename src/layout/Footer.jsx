
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"



 function Footer() {
  return (
    <footer className="w-full border-t mt-auto">
      <div className="w-full bg-[#FAFAFA] border-b border-[#E6E6E6]">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-start gap-4 px-6 py-8 md:px-4 md:flex-row md:items-center md:justify-between">
          <span className="text-lg font-bold text-[#252B42]">Bandage</span>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#23A6F0]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="1.5">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#23A6F0">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-8 md:px-4 md:flex-row md:gap-0 md:justify-between">
        <div className="flex flex-col gap-2 w-full md:w-[148px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Company Info</h4>
          <a className="text-[13px] text-[#737373]" href="/">
            About Us
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Carrier
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            We are hiring
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Blog
          </a>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[148px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Legal</h4>
          <a className="text-[13px] text-[#737373]" href="/">
            About Us
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Carrier
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            We are hiring
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Blog
          </a>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[148px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Features</h4>
          <a className="text-[13px] text-[#737373]" href="/">
            Business Marketing
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            User Analytic
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Live Chat
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Unlimited Support
          </a>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[148px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Resources</h4>
          <a className="text-[13px] text-[#737373]" href="/">
            IOS & Android
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Watch a Demo
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Customers
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            API
          </a>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[321px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Get In Touch</h4>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 border border-[#E6E6E6] px-4 py-3 text-[13px] rounded-l-md"
            />
            <button className="px-5 py-3 bg-[#23A6F0] text-white text-[13px] rounded-r-md">
              Subscribe
            </button>
          </div>
          <p className="text-[11px] text-[#737373]">Lorem ipsum dolor Amit</p>
        </div>
      </div>

      <div className="w-full bg-[#FAFAFA]">
        <div className="w-full max-w-6xl mx-auto px-6 py-4 text-xs text-[#737373] md:px-4">
          Made With Love By Finland All Right Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer