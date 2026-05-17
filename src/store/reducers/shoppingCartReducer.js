const initialState = {
  cart: [],
  payment: {},
  address: {},
}

// Action Types
export const SET_CART = "shoppingCart/SET_CART"
export const SET_PAYMENT = "shoppingCart/SET_PAYMENT"
export const SET_ADDRESS = "shoppingCart/SET_ADDRESS"
export const ADD_TO_CART = "shoppingCart/ADD_TO_CART"
export const REMOVE_FROM_CART = "shoppingCart/REMOVE_FROM_CART"
export const UPDATE_CART_ITEM_COUNT = "shoppingCart/UPDATE_CART_ITEM_COUNT"
export const TOGGLE_CART_ITEM = "shoppingCart/TOGGLE_CART_ITEM"
export const CLEAR_CART = "shoppingCart/CLEAR_CART"

// Action Creators
export const setCart = (cart) => ({ type: SET_CART, payload: cart })
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment })
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address })
export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product })
export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId })
export const updateCartItemCount = (productId, count) => ({ type: UPDATE_CART_ITEM_COUNT, payload: { productId, count } })
export const toggleCartItem = (productId) => ({ type: TOGGLE_CART_ITEM, payload: productId })
export const clearCart = () => ({ type: CLEAR_CART })


// Reducer
export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload }
    case SET_PAYMENT:
      return { ...state, payment: action.payload }
    case SET_ADDRESS:
      return { ...state, address: action.payload }
      case ADD_TO_CART:
  const existingItem = state.cart.find((item) => item.product.id === action.payload.id)
  if (existingItem) {
    return {
      ...state,
      cart: state.cart.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, count: item.count + 1 }
          : item
      ),
    }
  }
  return {
    ...state,
    cart: [...state.cart, { count: 1, checked: true, product: action.payload }],
  }
  case REMOVE_FROM_CART:
  return {
    ...state,
    cart: state.cart.filter((item) => item.product.id !== action.payload),
  }
case UPDATE_CART_ITEM_COUNT:
  return {
    ...state,
    cart: state.cart.map((item) =>
      item.product.id === action.payload.productId
        ? { ...item, count: action.payload.count }
        : item
    ),
  }
case TOGGLE_CART_ITEM:
  return {
    ...state,
    cart: state.cart.map((item) =>
      item.product.id === action.payload
        ? { ...item, checked: !item.checked }
        : item
    ),
  }
  case CLEAR_CART:
  return { ...state, cart: [], payment: {}, address: {} }

    default:
      return state
  }
}