import { Switch, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import ShopPage from "../pages/ShopPage"
import ProductDetailPage from "../pages/ProductDetailPage"
import ContactPage from "../pages/ContactPage"
import TeamPage from "../pages/TeamPage"
import AboutPage from "../pages/AboutPage"
import SignUpPage from "../pages/SignUpPage"
import LoginPage from "../pages/LoginPage"
import CartPage from "../pages/CartPage"
import OrdersPage from "../pages/OrdersPage"
import { fetchProducts } from "../store/reducers/productReducer"
import AdminPage from "../pages/AdminPage"



import ProtectedRoute from "../components/ProtectedRoute"
import CheckoutPage from "../pages/CheckoutPage"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { verifyToken } from "../store/reducers/clientReducer"

import { fetchCategories } from "../store/reducers/productReducer"



function PageContent() {

     const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyToken())
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [])

    
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetailPage} />
      <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/cart" component={CartPage} />
      <ProtectedRoute path="/checkout" component={CheckoutPage} />
      <ProtectedRoute path="/orders" component={OrdersPage} />
      <ProtectedRoute path="/xk92admin" component={AdminPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
     
      
      
    </Switch>
  )
}

export default PageContent