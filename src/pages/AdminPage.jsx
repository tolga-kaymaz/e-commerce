import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import axiosInstance from "../api/axios"
import { Plus, Edit2, Trash2, X } from "lucide-react"

function AdminPage() {
  const user = useSelector((state) => state.client.user)
  const history = useHistory()

  const [activeTab, setActiveTab] = useState("products")
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [showProductForm, setShowProductForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)

  const [productForm, setProductForm] = useState({
    name: "", description: "", price: "", stock: "", category_id: "", images: [{ url: "", index: 0 }]
  })

  const [categoryForm, setCategoryForm] = useState({
    title: "", img: "", gender: "e", rating: ""
  })

  useEffect(() => {
    if (!user?.email) {
      history.push("/login")
      return
    }
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    const res = await axiosInstance.get("/products?limit=100&offset=0")
    setProducts(res.data.products || [])
  }

  const fetchCategories = async () => {
    const res = await axiosInstance.get("/categories")
    setCategories(res.data)
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        category_id: Number(productForm.category_id),
        rating: Number(productForm.rating),
        
      }
      
      if (editingProduct) {
        await axiosInstance.put(`/admin/products/${editingProduct.id}`, payload)
      } else {
        await axiosInstance.post("/admin/products", payload)
      }
      await fetchProducts()
      setShowProductForm(false)
      setEditingProduct(null)
      setProductForm({ name: "", description: "", price: "", stock: "", category_id: "", images: [{ url: "", index: 0 }] })
    } catch (err) {
      alert("Hata: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...categoryForm, rating: Number(categoryForm.rating) }
      if (editingCategory) {
        await axiosInstance.put(`/admin/categories/${editingCategory.id}`, payload)
      } else {
        await axiosInstance.post("/admin/categories", payload)
      }
      await fetchCategories()
      setShowCategoryForm(false)
      setEditingCategory(null)
      setCategoryForm({ title: "", img: "", gender: "e", rating: "" })
    } catch (err) {
      alert("Hata: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Ürünü silmek istediğinize emin misiniz?")) return
    await axiosInstance.delete(`/admin/products/${id}`)
    await fetchProducts()
  }

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Kategoriyi silmek istediğinize emin misiniz?")) return
    await axiosInstance.delete(`/admin/categories/${id}`)
    await fetchCategories()
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category?.id,
      discount_price: product.discountPrice || "", 
      images: product.images?.length > 0 ? product.images : [{ url: "", index: 0 }]
    })
    setShowProductForm(true)
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setCategoryForm({
      title: category.title,
      img: category.img,
      gender: category.gender,
      rating: category.rating
    })
    setShowCategoryForm(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-2xl font-bold text-[#252B42] mb-8">Admin Paneli</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 text-sm font-semibold ${activeTab === "products" ? "border-b-2 border-[#23A6F0] text-[#23A6F0]" : "text-gray-400"}`}
        >
          Ürünler
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`pb-3 text-sm font-semibold ${activeTab === "categories" ? "border-b-2 border-[#23A6F0] text-[#23A6F0]" : "text-gray-400"}`}
        >
          Kategoriler
        </button>
      </div>

      {/* ÜRÜNLER */}
      {activeTab === "products" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#252B42]">Ürün Listesi ({products.length})</h2>
            <button
              onClick={() => { setShowProductForm(true); setEditingProduct(null); setProductForm({ name: "", description: "", price: "", stock: "", category_id: "", images: [{ url: "", index: 0 }] }) }}
              className="flex items-center gap-2 bg-[#23A6F0] text-white px-4 py-2 text-sm font-semibold rounded hover:bg-blue-600"
            >
              <Plus size={16} /> Ürün Ekle
            </button>
          </div>

          {/* Ürün Formu */}
          {showProductForm && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#252B42]">{editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}</h3>
                <button onClick={() => setShowProductForm(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-[#252B42]">Rating (0-5)</label>
  <input 
    type="number" 
    step="0.1" 
    min="0" 
    max="5" 
    value={productForm.rating} 
    onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
    className="border border-gray-300 rounded px-4 py-2 text-sm" 
  />
                  <label className="text-sm font-semibold text-[#252B42]">Ürün Adı</label>
                  <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Kategori</label>
                  <select value={productForm.category_id} onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm" required>
                    <option value="">Kategori Seçin</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.title} ({cat.gender === "k" ? "Kadın" : "Erkek"})</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Fiyat</label>
                  <input type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm" required />
                </div>
                <div className="flex flex-col gap-1">
  <label className="text-sm font-semibold text-[#252B42]">İndirimli Fiyat (opsiyonel)</label>
  <input 
    type="number" 
    step="0.01" 
    value={productForm.discount_price} 
    onChange={(e) => setProductForm({ ...productForm, discount_price: e.target.value })}
    className="border border-gray-300 rounded px-4 py-2 text-sm"
    placeholder="0.00"
  />
</div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Stok</label>
                  <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm" required />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-semibold text-[#252B42]">Açıklama</label>
                  <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm" rows={3} required />
                </div>
              {/* Görseller */}
<div className="flex flex-col gap-2 md:col-span-2">
  <label className="text-sm font-semibold text-[#252B42]">Görseller</label>
  {productForm.images.map((img, index) => (
    <div key={index} className="flex gap-2">
      <input
        type="text"
        value={img.url}
        onChange={(e) => {
          const newImages = [...productForm.images]
          newImages[index] = { ...newImages[index], url: e.target.value }
          setProductForm({ ...productForm, images: newImages })
        }}
        className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm"
        placeholder="https://..."
      />
      {index > 0 && (
        <button
          type="button"
          onClick={() => {
            const newImages = productForm.images.filter((_, i) => i !== index)
            setProductForm({ ...productForm, images: newImages })
          }}
          className="text-red-400 hover:text-red-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  ))}
  <button
    type="button"
    onClick={() => setProductForm({ ...productForm, images: [...productForm.images, { url: "", index: productForm.images.length }] })}
    className="flex items-center gap-2 text-[#23A6F0] text-sm font-semibold w-fit"
  >
    <Plus size={16} /> Görsel Ekle
  </button>
</div>
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" disabled={loading} className="bg-[#23A6F0] text-white px-8 py-2 text-sm font-semibold rounded hover:bg-blue-600 disabled:opacity-70">
                    {loading ? "Kaydediliyor..." : editingProduct ? "Güncelle" : "Kaydet"}
                  </button>
                  <button type="button" onClick={() => setShowProductForm(false)} className="border border-gray-300 px-8 py-2 text-sm font-semibold rounded hover:bg-gray-50">
                    İptal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Ürün Tablosu */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="px-4 py-3">Görsel</th>
                  <th className="px-4 py-3">Ürün Adı</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Fiyat</th>
                  <th className="px-4 py-3">Stok</th>
                  <th className="px-4 py-3">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {product.images?.[0]?.url ? (
                        <img src={product.images[0].url} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#252B42]">{product.name}</td>
                    <td className="px-4 py-3 text-gray-500">{product.category?.title}</td>
                    <td className="px-4 py-3 text-[#23A6F0] font-semibold">${product.price}</td>
                    <td className="px-4 py-3 text-gray-500">{product.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditProduct(product)} className="text-gray-400 hover:text-blue-500"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KATEGORİLER */}
      {activeTab === "categories" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#252B42]">Kategori Listesi ({categories.length})</h2>
            <button
              onClick={() => { setShowCategoryForm(true); setEditingCategory(null); setCategoryForm({ title: "", img: "", gender: "e", rating: "" }) }}
              className="flex items-center gap-2 bg-[#23A6F0] text-white px-4 py-2 text-sm font-semibold rounded hover:bg-blue-600"
            >
              <Plus size={16} /> Kategori Ekle
            </button>
          </div>

          {/* Kategori Formu */}
          {showCategoryForm && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#252B42]">{editingCategory ? "Kategori Düzenle" : "Yeni Kategori Ekle"}</h3>
                <button onClick={() => setShowCategoryForm(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleCategorySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Kategori Adı</label>
                  <input type="text" value={categoryForm.title} onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Cinsiyet</label>
                  <select value={categoryForm.gender} onChange={(e) => setCategoryForm({ ...categoryForm, gender: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm">
                    <option value="e">Erkek</option>
                    <option value="k">Kadın</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Rating</label>
                  <input type="number" step="0.1" min="0" max="5" value={categoryForm.rating} onChange={(e) => setCategoryForm({ ...categoryForm, rating: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#252B42]">Görsel URL</label>
                  <input type="text" value={categoryForm.img} onChange={(e) => setCategoryForm({ ...categoryForm, img: e.target.value })}
                    className="border border-gray-300 rounded px-4 py-2 text-sm" placeholder="https://..." required />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" disabled={loading} className="bg-[#23A6F0] text-white px-8 py-2 text-sm font-semibold rounded hover:bg-blue-600 disabled:opacity-70">
                    {loading ? "Kaydediliyor..." : editingCategory ? "Güncelle" : "Kaydet"}
                  </button>
                  <button type="button" onClick={() => setShowCategoryForm(false)} className="border border-gray-300 px-8 py-2 text-sm font-semibold rounded hover:bg-gray-50">
                    İptal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Kategori Tablosu */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="px-4 py-3">Görsel</th>
                  <th className="px-4 py-3">Kategori Adı</th>
                  <th className="px-4 py-3">Cinsiyet</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {category.img ? (
                        <img src={category.img} alt={category.title} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#252B42]">{category.title}</td>
                    <td className="px-4 py-3 text-gray-500">{category.gender === "k" ? "Kadın" : "Erkek"}</td>
                    <td className="px-4 py-3 text-gray-500">{category.rating}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditCategory(category)} className="text-gray-400 hover:text-blue-500"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteCategory(category.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage