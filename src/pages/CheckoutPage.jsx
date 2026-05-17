import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { ChevronRight, Plus, Trash2, Edit2 } from "lucide-react"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import axiosInstance from "../api/axios"
import { clearCart } from "../store/reducers/shoppingCartReducer"


const turkishCities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya",
  "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu",
  "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır",
  "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun",
  "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir",
  "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya",
  "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop",
  "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak",
  "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale",
  "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük",
  "Kilis", "Osmaniye", "Düzce"
]

function CheckoutPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)
  const user = useSelector((state) => state.client.user)

  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkedItems = cart.filter((item) => item.checked)
  const totalPrice = checkedItems.reduce((sum, item) => sum + item.product.price * item.count, 0)
  const shippingCost = totalPrice >= 150 ? 0 : 29.99
  const grandTotal = totalPrice + shippingCost

  const [cards, setCards] = useState([])
const [selectedCard, setSelectedCard] = useState(null)
const [showCardForm, setShowCardForm] = useState(false)
const [editingCard, setEditingCard] = useState(null)
const [step, setStep] = useState(1)

const [ccv, setCcv] = useState("")
const [orderLoading, setOrderLoading] = useState(false)
const [paymentType, setPaymentType] = useState("saved")   
const [newCard, setNewCard] = useState({                   
    card_no: "",
    name_on_card: "",
    expire_month: "",
    expire_year: "",
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { register: registerCard, handleSubmit: handleSubmitCard, reset: resetCard, formState: { errors: cardErrors } } = useForm()

const history = useHistory()

  // Adresleri çek
  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get("/user/address")
      setAddresses(res.data)
    } catch (err) {
      console.error("Failed to fetch addresses:", err)
    }
  }

  const fetchCards = async () => {
  try {
    const res = await axiosInstance.get("/user/card")
    setCards(res.data)
  } catch (err) {
    console.error("Failed to fetch cards:", err)
  }
}

  useEffect(() => {
    fetchAddresses()
    fetchCards()
  }, [])

  // Adres ekle veya güncelle
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      if (editingAddress) {
        await axiosInstance.put("/user/address", { id: editingAddress.id, ...data })
      } else {
        await axiosInstance.post("/user/address", data)
      }
      await fetchAddresses()
      setShowForm(false)
      setEditingAddress(null)
      reset()
    } catch (err) {
      console.error("Failed to save address:", err)
    } finally {
      setLoading(false)
    }
  }

  // Adres sil
  const handleDelete = async (addressId) => {
    try {
      await axiosInstance.delete(`/user/address/${addressId}`)
      await fetchAddresses()
      if (selectedAddress?.id === addressId) setSelectedAddress(null)
    } catch (err) {
      console.error("Failed to delete address:", err)
    }
  }

  // Düzenle
  const handleEdit = (address) => {
    setEditingAddress(address)
    setShowForm(true)
    reset(address)
  }

  const onCardSubmit = async (data) => {
  setLoading(true)
  try {
    const payload = {
      card_no: data.card_no,
      expire_month: Number(data.expire_month),
      expire_year: Number(data.expire_year),
      name_on_card: data.name_on_card,
    }
    if (editingCard) {
      await axiosInstance.put("/user/card", { id: editingCard.id, ...payload })
    } else {
      await axiosInstance.post("/user/card", payload)
    }
    setCcv(data.ccv)
    await fetchCards()
    setShowCardForm(false)
    setEditingCard(null)
    resetCard()
  } catch (err) {
    console.error("Failed to save card:", err)
  } finally {
    setLoading(false)
  }
}

// Kart sil:
const handleDeleteCard = async (cardId) => {
  try {
    await axiosInstance.delete(`/user/card/${cardId}`)
    await fetchCards()
    if (selectedCard?.id === cardId) setSelectedCard(null)
  } catch (err) {
    console.error("Failed to delete card:", err)
  }
}

// Kart düzenle:
const handleEditCard = (card) => {
  setEditingCard(card)
  setShowCardForm(true)
  resetCard(card)
}

const handleCreateOrder = async () => {
  const cardData = paymentType === "saved" ? selectedCard : newCard  // ← bunu ekle

  if (!selectedAddress || !selectedCard || !ccv) {
    toast.error("Lütfen adres, kart seçin ve CCV girin!")
    return
  }

  setOrderLoading(true)
  try {
    const payload = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: Number(cardData.cardNo || cardData.card_no),
      card_name: cardData.nameOnCard || cardData.name_on_card,
      card_expire_month: Number(cardData.expireMonth || cardData.expire_month),
      card_expire_year: Number(cardData.expireYear || cardData.expire_year),
      card_ccv: Number(ccv),
      price: grandTotal,
      products: checkedItems.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.name,
      })),
    }

    console.log("cardData:", cardData)
    console.log("Order payload:", payload)

    await axiosInstance.post("/order", payload)
    dispatch(clearCart())
    toast.success("Siparişiniz başarıyla oluşturuldu! 🎉")
    history.push("/")
  } catch (err) {
    toast.error(err.response?.data?.message || "Sipariş oluşturulamadı!")
  } finally {
    setOrderLoading(false)
  }
}

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className="font-bold text-gray-800">Home</Link>
        <ChevronRight size={16} />
        <Link to="/cart" className="text-gray-500">Cart</Link>
        <ChevronRight size={16} />
        <span className="text-gray-500">Checkout</span>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setStep(1)}
          className={`flex items-center gap-2 text-sm font-semibold ${step === 1 ? "text-orange-500" : "text-gray-400"}`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? "bg-orange-500 text-white" : "bg-gray-200"}`}>1</span>
          Adres Bilgileri
        </button>
        <ChevronRight size={16} className="text-gray-400" />
        <button
          onClick={() => selectedAddress && setStep(2)}
          className={`flex items-center gap-2 text-sm font-semibold ${step === 2 ? "text-orange-500" : "text-gray-400"}`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? "bg-orange-500 text-white" : "bg-gray-200"}`}>2</span>
          Ödeme Seçenekleri
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sol */}
        <div className="flex-1 flex flex-col gap-6">

          {/* STEP 1 - ADRES */}
          {step === 1 && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-orange-500">Teslimat Adresi</h2>
                <button
                  onClick={() => { setShowForm(!showForm); setEditingAddress(null); reset() }}
                  className="flex items-center gap-2 text-orange-500 border border-orange-500 px-4 py-2 text-sm font-semibold hover:bg-orange-50 rounded"
                >
                  <Plus size={16} />
                  Yeni Adres Ekle
                </button>
              </div>

              {showForm && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-[#252B42] mb-4">{editingAddress ? "Adresi Düzenle" : "Yeni Adres Ekle"}</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-[#252B42]">Adres Başlığı</label>
                      <input type="text" placeholder="Ev, İş..." className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]" {...register("title", { required: "Gerekli" })} />
                      {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-[#252B42]">Ad</label>
                      <input type="text" placeholder="Adınız" className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]" {...register("name", { required: "Gerekli" })} />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-[#252B42]">Soyad</label>
                      <input type="text" placeholder="Soyadınız" className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]" {...register("surname", { required: "Gerekli" })} />
                      {errors.surname && <p className="text-red-500 text-xs">{errors.surname.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-[#252B42]">Telefon</label>
                      <input type="text" placeholder="05XX XXX XX XX" className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]" {...register("phone", { required: "Gerekli" })} />
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-[#252B42]">Şehir</label>
                      <select className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]" {...register("city", { required: "Gerekli" })}>
                        <option value="">Şehir Seçin</option>
                        {turkishCities.map((city) => (
                          <option key={city} value={city.toLowerCase()}>{city}</option>
                        ))}
                      </select>
                      {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-semibold text-[#252B42]">İlçe</label>
                      <input type="text" placeholder="İlçe" className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]" {...register("district", { required: "Gerekli" })} />
                      {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-sm font-semibold text-[#252B42]">Mahalle</label>
                      <input type="text" placeholder="Mahalle" className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]" {...register("neighborhood", { required: "Gerekli" })} />
                      {errors.neighborhood && <p className="text-red-500 text-xs">{errors.neighborhood.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-sm font-semibold text-[#252B42]">Adres Detayı</label>
                      <textarea placeholder="Sokak, Bina No, Daire No..." rows={3} className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]" {...register("address", { required: "Gerekli" })} />
                      {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                    </div>
                    <div className="md:col-span-2 flex gap-4">
                      <button type="submit" disabled={loading} className="bg-orange-500 text-white px-8 py-2 text-sm font-semibold hover:bg-orange-600 rounded disabled:opacity-70">
                        {loading ? "Kaydediliyor..." : editingAddress ? "Güncelle" : "Kaydet"}
                      </button>
                      <button type="button" onClick={() => { setShowForm(false); setEditingAddress(null); reset() }} className="border border-gray-300 px-8 py-2 text-sm font-semibold hover:bg-gray-50 rounded">
                        İptal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${selectedAddress?.id === address.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" checked={selectedAddress?.id === address.id} onChange={() => setSelectedAddress(address)} className="accent-orange-500" />
                        <span className="font-bold text-[#252B42] text-sm">{address.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); handleEdit(address) }} className="text-gray-400 hover:text-blue-500"><Edit2 size={14} /></button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(address.id) }} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{address.name} {address.surname}</p>
                    <p className="text-xs text-gray-500">{address.neighborhood}, {address.district}, {address.city}</p>
                    <p className="text-xs text-gray-500">{address.phone}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => selectedAddress && setStep(2)}
                disabled={!selectedAddress}
                className="bg-orange-500 text-white py-3 text-sm font-semibold hover:bg-orange-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Devam Et &gt;
              </button>
            </>
          )}

          {/* STEP 2 - KART */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-orange-500">Ödeme Seçenekleri</h2>

              {/* Tab Seçimi */}
              <div className="flex gap-4 border-b border-gray-200">
                <button
                  onClick={() => setPaymentType("saved")}
                  className={`pb-3 text-sm font-semibold ${paymentType === "saved" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-400"}`}
                >
                  Kayıtlı Kartımla Öde
                </button>
                <button
                  onClick={() => setPaymentType("new")}
                  className={`pb-3 text-sm font-semibold ${paymentType === "new" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-400"}`}
                >
                  Yeni Kartla Öde
                </button>
              </div>

              {/* Kayıtlı Kart */}
              {paymentType === "saved" && (
                <div className="flex flex-col gap-4">
                  {/* Yeni kart ekleme butonu */}
                  <button
                    onClick={() => { setShowCardForm(!showCardForm); setEditingCard(null); resetCard() }}
                    className="flex items-center gap-2 text-orange-500 border border-orange-500 px-4 py-2 text-sm font-semibold hover:bg-orange-50 rounded w-fit"
                  >
                    <Plus size={16} />
                    Yeni Kart Ekle
                  </button>

                  {/* Kart Formu */}
                  {showCardForm && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="font-bold text-[#252B42] mb-4">{editingCard ? "Kartı Düzenle" : "Yeni Kart Ekle"}</h3>
                      <form onSubmit={handleSubmitCard(onCardSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-semibold text-[#252B42]">Kart Numarası</label>
                          <input type="text" placeholder="1234123412341234" maxLength={16} autoComplete="off" className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
                            {...registerCard("card_no", { required: "Gerekli", minLength: { value: 16, message: "16 haneli olmalı" }, maxLength: { value: 16, message: "16 haneli olmalı" } })} />
                          {cardErrors.card_no && <p className="text-red-500 text-xs">{cardErrors.card_no.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-sm font-semibold text-[#252B42]">Kart Üzerindeki İsim</label>
                          <input type="text" placeholder="Ad Soyad" className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
                            {...registerCard("name_on_card", { required: "Gerekli" })} />
                          {cardErrors.name_on_card && <p className="text-red-500 text-xs">{cardErrors.name_on_card.message}</p>}
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-1 flex-1">
                            <label className="text-sm font-semibold text-[#252B42]">Son Kullanma Tarihi</label>
                            <div className="flex gap-2">
                              <select className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm" {...registerCard("expire_month", { required: "Gerekli" })}>
                                <option value="">Ay</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
                              </select>
                              <select className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm" {...registerCard("expire_year", { required: "Gerekli" })}>
                                <option value="">Yıl</option>
                                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((y) => <option key={y} value={y}>{y}</option>)}
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-[#252B42]">CCV</label>
                            <input type="text" placeholder="***" maxLength={3} autoComplete="off"
                              className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0] w-24"
                              {...registerCard("ccv", { required: "Gerekli" })} />
                            {cardErrors.ccv && <p className="text-red-500 text-xs">{cardErrors.ccv.message}</p>}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button type="submit" disabled={loading} className="bg-orange-500 text-white px-8 py-2 text-sm font-semibold hover:bg-orange-600 rounded disabled:opacity-70">
                            {loading ? "Kaydediliyor..." : editingCard ? "Güncelle" : "Kaydet"}
                          </button>
                          <button type="button" onClick={() => { setShowCardForm(false); setEditingCard(null); resetCard() }} className="border border-gray-300 px-8 py-2 text-sm font-semibold hover:bg-gray-50 rounded">
                            İptal
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Kart Listesi */}
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => { setSelectedCard(card); setCcv("") }}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${selectedCard?.id === card.id ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={selectedCard?.id === card.id} onChange={() => setSelectedCard(card)} className="accent-orange-500" />
                      <div>
                        <p className="font-bold text-[#252B42] text-sm">**** **** **** {card.card_no?.slice(-4)}</p>
                        <p className="text-xs text-gray-500">{card.name_on_card}</p>
                        <p className="text-xs text-gray-500">{card.expire_month}/{card.expire_year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); handleEditCard(card) }} className="text-gray-400 hover:text-blue-500"><Edit2 size={14} /></button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id) }} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>

                  {/* Kart seçilince CCV */}
                  {selectedCard?.id === card.id && (
                    <div className="mt-3 flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                      <label className="text-sm font-semibold text-[#252B42]">CCV</label>
                      <input
                        type="text"
                        placeholder="***"
                        maxLength={3}
                        autoComplete="off"
                        value={ccv}
                        onChange={(e) => setCcv(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0] w-24"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Yeni Kart */}
          {paymentType === "new" && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#252B42]">Kart Numarası</label>
                <input type="text" placeholder="1234123412341234" maxLength={16} autoComplete="off"
                  value={newCard.card_no}
                  onChange={(e) => setNewCard({ ...newCard, card_no: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-[#252B42]">Kart Üzerindeki İsim</label>
                <input type="text" placeholder="Ad Soyad"
                  value={newCard.name_on_card}
                  onChange={(e) => setNewCard({ ...newCard, name_on_card: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0]"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-semibold text-[#252B42]">Son Kullanma Tarihi</label>
                  <div className="flex gap-2">
                    <select className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm"
                      value={newCard.expire_month}
                      onChange={(e) => setNewCard({ ...newCard, expire_month: e.target.value })}
                    >
                      <option value="">Ay</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm"
                      value={newCard.expire_year}
                      onChange={(e) => setNewCard({ ...newCard, expire_year: e.target.value })}
                    >
                      <option value="">Yıl</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">CCV</label>
                  <input type="text" placeholder="***" maxLength={3} autoComplete="off"
                    value={ccv}
                    onChange={(e) => setCcv(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#23A6F0] w-24"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sipariş Butonu */}
          <button
            onClick={handleCreateOrder}
            disabled={!selectedAddress || (paymentType === "saved" && !selectedCard) || !ccv || orderLoading}
            className="bg-orange-500 text-white py-3 text-sm font-semibold hover:bg-orange-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {orderLoading ? "Sipariş Oluşturuluyor..." : "Siparişi Tamamla"}
          </button>
        </>
      )}

      </div>

        {/* Sağ - Sipariş Özeti */}
        <div className="w-full lg:w-80">
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4 sticky top-4">
            <button className="bg-orange-500 text-white text-center py-3 text-sm font-semibold hover:bg-orange-600 rounded">
              Kaydet ve Devam Et &gt;
            </button>
            <h2 className="text-lg font-bold text-[#252B42]">Sipariş Özeti</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Ürünün Toplamı</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Kargo Toplam</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              {shippingCost === 0 && (
                <div className="flex justify-between text-green-500">
                  <span>150$ ve Üzeri Kargo Bedava</span>
                  <span>-$29.99</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between font-bold text-orange-500">
                <span>Toplam</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="bg-orange-500 text-white text-center py-3 text-sm font-semibold hover:bg-orange-600 rounded">
              Kaydet ve Devam Et &gt;
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage