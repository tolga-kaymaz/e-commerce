
import { clearCart } from "./shoppingCartReducer"
const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "light",
  language: "en",
}

// Action Types
export const SET_USER = "client/SET_USER"
export const SET_ROLES = "client/SET_ROLES"
export const SET_THEME = "client/SET_THEME"
export const SET_LANGUAGE = "client/SET_LANGUAGE"

export const LOGOUT_USER = "client/LOGOUT_USER"

// Action Creators
export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language })

// Thunk - Roles'u sadece ihtiyaç halinde çek
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client
  if (roles.length > 0) return // Zaten varsa tekrar çekme

  try {
    const { default: axiosInstance } = await import("../../api/axios")
    const res = await axiosInstance.get("/roles")
    dispatch(setRoles(res.data))
  } catch (err) {
    console.error("Failed to fetch roles:", err)
  }
}

export const loginUser = (credentials, rememberMe) => async (dispatch) => {
  const { default: axiosInstance } = await import("../../api/axios")
  const res = await axiosInstance.post("/login", credentials)
  
  const { token, ...userInfo } = res.data

  // Token'ı axios header'a ekle
  axiosInstance.defaults.headers.common["Authorization"] = token
   
  dispatch(setUser({ ...userInfo, token }))
  
  if (rememberMe) {
    localStorage.setItem("token", token)
  }
  
  return res.data
}



export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem("token")
  
  if (!token) return

  try {
    const { default: axiosInstance } = await import("../../api/axios")
    
    // Token'ı axios header'a ekle
    axiosInstance.defaults.headers.common["Authorization"] = token
    
    // Verify isteği at
    const res = await axiosInstance.get("/verify")
    
    // Kullanıcıyı store'a kaydet
    dispatch(setUser({ ...res.data, token }))
    
    // Token'ı yenile
    localStorage.setItem("token", token)
    
  } catch (err) {
    // Token geçersizse temizle
    localStorage.removeItem("token")
    delete axiosInstance.defaults.headers.common["Authorization"]
  }
}



export const logoutUser = () => async (dispatch) => {
  const { default: axiosInstance } = await import("../../api/axios")
  localStorage.removeItem("token")
  
  delete axiosInstance.defaults.headers.common["Authorization"]
  dispatch({ type: LOGOUT_USER })
  dispatch(clearCart())
}





// Reducer
export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_ROLES:
      return { ...state, roles: action.payload }
    case SET_THEME:
      return { ...state, theme: action.payload }
    case SET_LANGUAGE:
      return { ...state, language: action.payload }
      case LOGOUT_USER:
  return { ...state, user: {} }
    default:
      return state
  }
}