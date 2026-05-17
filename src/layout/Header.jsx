import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Gravatar from "react-gravatar"
import { useDispatch } from "react-redux"
import { logoutUser } from "../store/reducers/clientReducer"
import { ChevronDown } from "lucide-react"


function Header() {
   
  const [menuOpen, setMenuOpen] = useState(false)
   const user = useSelector((state) => state.client.user)
   const dispatch = useDispatch()

   const categories = useSelector((state) => state.product.categories)
   const [shopOpen, setShopOpen] = useState(false)
   const [mobileShopOpen, setMobileShopOpen] = useState(false)

   const [userMenuOpen, setUserMenuOpen] = useState(false)

   

   const kadinCategories = categories.filter(c => c.gender === "k")
   const erkekCategories = categories.filter(c => c.gender === "e")

   const cart = useSelector((state) => state.shoppingCart.cart)
const [cartOpen, setCartOpen] = useState(false)
const totalItems = cart.reduce((sum, item) => sum + item.count, 0)

   useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".shop-dropdown")) setShopOpen(false)
         if (!e.target.closest(".cart-dropdown")) setCartOpen(false)
        if (!e.target.closest(".user-menu")) setUserMenuOpen(false)
    
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  
return (
    <header>
      
      <div className="hidden md:flex bg-gray-800 text-white text-sm py-2 px-8 justify-between items-center">
        <div className="flex gap-6">
          <span>(225) 555-0118</span>
          <span>michelle.rivera@example.com</span>
        </div>
        <span>Follow Us and get a chance to win 80% off</span>
       <div className="flex gap-3 items-center">
  <span>Follow Us</span>
  <FaInstagram size={18} className="text-white cursor-pointer hover:text-gray-300" />
  <FaYoutube size={18} className="text-white cursor-pointer hover:text-gray-300" />
  <FaFacebook size={18} className="text-white cursor-pointer hover:text-gray-300" />
  <FaTwitter size={18} className="text-white cursor-pointer hover:text-gray-300" />
</div>
      </div>

      
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 shadow-md">
        
        <Link to="/" className="text-2xl font-bold text-gray-800">
         Bandage
          </Link>

        
        <ul className="hidden md:flex gap-6 text-gray-600">
          <li><Link to="/">Home</Link></li>
          <li className="relative shop-dropdown">
  <button
    onClick={() => setShopOpen(!shopOpen)}
    className="flex items-center gap-1 hover:text-gray-800"
  >
    <Link to="/shop" onClick={(e) => e.stopPropagation()}>Shop</Link>
    <ChevronDown size={16} />
  </button>

  {shopOpen && (
    <div className="absolute top-8 left-0 bg-white shadow-lg border border-gray-100 p-6 z-50 min-w-[400px] flex gap-12">
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-[#252B42]">Kadın</h3>
        {kadinCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/shop/kadin/${cat.title.toLowerCase()}/${cat.id}`}
            className="text-gray-500 hover:text-[#23A6F0] text-sm"
            onClick={() => setShopOpen(false)}
          >
            {cat.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-[#252B42]">Erkek</h3>
        {erkekCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/shop/erkek/${cat.title.toLowerCase()}/${cat.id}`}
            className="text-gray-500 hover:text-[#23A6F0] text-sm"
            onClick={() => setShopOpen(false)}
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  )}
</li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        
       {/* Sağ İkonlar */}
        <div className="flex items-center gap-4 text-blue-500">
          {/* Login / Kullanıcı */}
          {user?.email ? (
  <div className="hidden md:flex items-center gap-2 relative user-menu">
    <button
      onClick={() => setUserMenuOpen(!userMenuOpen)}
      className="flex items-center gap-2"
    >
      <Gravatar email={user.email} size={32} className="rounded-full" />
      <span className="text-sm font-medium text-[#252B42]">{user.name}</span>
      <ChevronDown size={14} className="text-gray-400" />
    </button>

    {userMenuOpen && (
      <div className="absolute right-0 top-10 bg-white shadow-lg border border-gray-100 z-50 w-48 rounded-lg py-2">
        <Link
          to="/orders"
          onClick={() => setUserMenuOpen(false)}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Siparişlerim
        </Link>
        <button
          onClick={() => { dispatch(logoutUser()); setUserMenuOpen(false) }}
          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-50"
        >
          Çıkış Yap
        </button>
      </div>
    )}
  </div>
) : (
  <Link to="/login" className="hidden md:block font-medium">Login / Register</Link>
)}

          <Search size={20} className="cursor-pointer hover:text-blue-700" />
          {/* ShoppingCart ikonunu güncelle: */}
<div className="relative cart-dropdown">
  <button onClick={() => setCartOpen(!cartOpen)} className="relative">
    <ShoppingCart size={20} className="cursor-pointer hover:text-blue-700" />
    {totalItems > 0 && (
      <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
        {totalItems}
      </span>
    )}
  </button>

  {cartOpen && (
    <div className="fixed md:absolute right-0 md:right-0 top-16 md:top-8 left-0 md:left-auto bg-white shadow-lg border border-gray-100 z-50 md:w-[360px] rounded-lg mx-4 md:mx-0">

      <div className="p-4 border-b">
        <h3 className="font-bold text-[#252B42]">Sepetim ({totalItems} Ürün)</h3>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-8">Sepetiniz boş</p>
        ) : (
          cart.map((item) => (
            <div key={item.product.id} className="flex gap-3 p-4 border-b">
              <img
                src={item.product.images?.[0]?.url}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-sm font-semibold text-[#252B42] line-clamp-2">{item.product.name}</p>
                <p className="text-xs text-gray-500">Adet: {item.count}</p>
                <p className="text-sm font-bold text-[#23A6F0]">${item.product.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 flex gap-2">
          <Link
            to="/cart"
            onClick={() => setCartOpen(false)}
            className="flex-1 border border-gray-300 text-center py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Sepete Git
          </Link>
          <Link
            to="/checkout"
            onClick={() => setCartOpen(false)}
            className="flex-1 bg-[#23A6F0] text-white text-center py-2 text-sm font-semibold hover:bg-blue-600"
          >
            Siparişi Tamamla
          </Link>
        </div>
      )}
    </div>
  )}
</div>
          <Heart size={20} className="cursor-pointer hover:text-blue-700" />



        
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      
   {menuOpen && (
  <div className="md:hidden flex flex-col items-center gap-6 py-8 shadow-md text-gray-600 text-lg">
    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
         {/* Shop - mobil dropdown */}
    <div className="flex flex-col items-center gap-3 w-full px-8">
  <button
    onClick={() => setMobileShopOpen(!mobileShopOpen)}
    className="flex items-center gap-1"
  >
    Shop <ChevronDown size={16} />
  </button>
  {mobileShopOpen && (
    <div className="flex gap-12 w-full justify-center">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-[#252B42] text-sm">Kadın</h3>
        {kadinCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/shop/kadin/${cat.title.toLowerCase()}/${cat.id}`}
            className="text-gray-500 text-sm hover:text-[#23A6F0]"
            onClick={() => { setMobileShopOpen(false); setMenuOpen(false) }}
          >
            {cat.title}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-[#252B42] text-sm">Erkek</h3>
        {erkekCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/shop/erkek/${cat.title.toLowerCase()}/${cat.id}`}
            className="text-gray-500 text-sm hover:text-[#23A6F0]"
            onClick={() => { setMobileShopOpen(false); setMenuOpen(false) }}
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  )}
</div>
    <Link to="/product" onClick={() => setMenuOpen(false)}>Product</Link>
    <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
    <Link to="/team" onClick={() => setMenuOpen(false)}>Team</Link>
     <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
    <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
    {user?.email ? (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Gravatar email={user.email} size={32} className="rounded-full" />
          <span className="text-sm font-medium text-[#252B42]">{user.name}</span>
        </div>
        <Link
          to="/orders"
          onClick={() => setMenuOpen(false)}
          className="text-sm text-gray-600 hover:text-orange-500"
        >
          Siparişlerim
        </Link>
        <button
          onClick={() => { dispatch(logoutUser()); setMenuOpen(false) }}
          className="text-sm text-red-400 hover:text-red-600"
        >
          Logout
        </button>
      </div>
    ) : (
      <Link to="/login" onClick={() => setMenuOpen(false)} className="text-blue-500 font-medium">Login / Register</Link>
    )}
  </div>
)}
    </header>
  )
}

export default Header