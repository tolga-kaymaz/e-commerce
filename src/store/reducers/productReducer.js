const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 12,
  offset: 0,
  filter: "",
  sort: "",
  fetchState: "NOT_FETCHED", 
  selectedProduct: null,
}

// Action Types
export const SET_CATEGORIES = "product/SET_CATEGORIES"
export const SET_PRODUCT_LIST = "product/SET_PRODUCT_LIST"
export const SET_TOTAL = "product/SET_TOTAL"
export const SET_FETCH_STATE = "product/SET_FETCH_STATE"
export const SET_LIMIT = "product/SET_LIMIT"
export const SET_OFFSET = "product/SET_OFFSET"
export const SET_FILTER = "product/SET_FILTER"
export const SET_SORT = "product/SET_SORT"
export const SET_SELECTED_PRODUCT = "product/SET_SELECTED_PRODUCT"

// Action Creators
export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories })
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList })
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total })
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState })
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit })
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset })
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter })
export const setSort = (sort) => ({ type: SET_SORT, payload: sort })
export const setSelectedProduct = (product) => ({ type: SET_SELECTED_PRODUCT, payload: product })

export const fetchCategories = () => async (dispatch) => {
  try {
    const { default: axiosInstance } = await import("../../api/axios")
    const res = await axiosInstance.get("/categories")
    dispatch(setCategories(res.data))
  } catch (err) {
    console.error("Failed to fetch categories:", err)
  }
}

export const fetchProducts = (categoryId) => async (dispatch, getState) => {
  dispatch(setFetchState("FETCHING"))
  try {
    const { default: axiosInstance } = await import("../../api/axios")
    const { limit, offset, filter, sort } = getState().product
    
    const params = { limit, offset }
    if (categoryId) params.category = categoryId
    if (filter) params.filter = filter
    if (sort) params.sort = sort

    const res = await axiosInstance.get("/products", { params })
    console.log("API Response:", res.data)
    dispatch(setProductList(res.data.products))
    dispatch(setTotal(res.data.total))
    dispatch(setFetchState("FETCHED"))
  } catch (err) {
    dispatch(setFetchState("FAILED"))
    console.error("Failed to fetch products:", err)
  }
}

export const fetchProduct = (productId) => async (dispatch) => {
  dispatch(setFetchState("FETCHING"))
  try {
    const { default: axiosInstance } = await import("../../api/axios")
    const res = await axiosInstance.get(`/products/${productId}`)
    dispatch(setSelectedProduct(res.data))
    dispatch(setFetchState("FETCHED"))
  } catch (err) {
    dispatch(setFetchState("FAILED"))
    console.error("Failed to fetch product:", err)
  }
}

// Reducer
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload }
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload }
    case SET_TOTAL:
      return { ...state, total: action.payload }
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload }
    case SET_LIMIT:
      return { ...state, limit: action.payload }
    case SET_OFFSET:
      return { ...state, offset: action.payload }
    case SET_FILTER:
      return { ...state, filter: action.payload }
      case SET_SORT:
  return { ...state, sort: action.payload }
      case SET_SELECTED_PRODUCT:
  return { ...state, selectedProduct: action.payload }

    default:
      return state
  }
}