import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getData } from "../Api";

const StateContext = createContext()

const StateContextProvider = ({children}) => {

    const [productList, setProductList] = useState([])

    const [search,setSearch] = useState("")

    const initialState =  {
        products: [],
        cart: [],
    }

    const reducer = (state, action) => {
        switch(action.type){
            case "GET_PRODUCTS" : 
                return {...state, products: action.payload};
            case "ADD_TO_CART":
                // return {...state, cart: [...state.cart, {...action.payload, qty: 1}]};
                // avoid duplicate cart item
                const item = action.payload;
                const isExisted = state.cart.find(c => c.id === item.id);
                if(isExisted) {
                    return {...state, cart: state.cart.map(c => c.id ===item.id ? {...item, qty: 1, subTotal: item.price} : c)}
                } else {
                    return {...state, cart: [...state.cart, {...item, qty: 1, subTotal: item.price}]}
                }
            case "REMOVE_FROM_CART":
                return {...state, cart: state.cart.filter(item => item.id !== action.payload.id)}
            case "CART_EMPTY":
                return {...state, cart: []}
            case "CART_INCREASE":
                const cartItemInc = action.payload;
                return {...state, cart: state.cart.map(c => c.id === cartItemInc.id ? {...cartItemInc, qty: cartItemInc.qty + 1, subTotal: (cartItemInc.qty + 1) * cartItemInc.price} : c)}
            case "CART_DECREASE":
                const cartItemDec = action.payload;
                if(cartItemDec.qty > 1){
                    return {...state, cart: state.cart.map(c => c.id === cartItemDec.id ? {...cartItemDec, qty: cartItemDec.qty - 1, subTotal: (cartItemDec.qty - 1) * cartItemDec.price} : c)}
                } else {
                    return state
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const getProducts = async() => {
        const data = await getData('/products')
        setProductList(data)
    }
    // console.log(productList);

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        dispatch({type:"GET_PRODUCTS", payload: productList})
        const filterProducts = productList.filter(pd => pd.title.toLowerCase().includes(search.toLowerCase()))
        dispatch({type:"GET_PRODUCTS", payload: filterProducts})
    },[productList, search])

    const data = {state, search, setSearch, dispatch}
    return(
        <StateContext.Provider value={data}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)

export default StateContextProvider