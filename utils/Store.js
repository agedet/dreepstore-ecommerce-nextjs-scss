import { createContext, useReducer } from "react";
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
    darkMode: false,
    cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {}, PaymentMethod: '' },
};

function reducer(state, action) {
    switch (action.type) {
        case 'DARK_MODE_ON': {
            return { ...state, darkMode: true };
        }
        case 'DARK_MODE_OFF': {
            return { ...state, darkMode: false };
        }
        case 'CART_ADD_ITEM' : {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find (
                (item) => item.slug === newItem.slug
            );
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem.name ? newItem : item) 
                : 
                [ ...state.cart.cartItems, newItem ];
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
            return { ...state, cart: { ...state.cart, cartItems }};
        }
        case 'CART_REMOVE_ITEM' : {
            const cartItems = state.cart.cartItems.filter(
                (item) => item.slug !== action.payload.slug
            );
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
            return { ...state, cart: { ...state.cart, cartItems}};
        } 
        case 'CASE_RESET':
            return { ...state, cart: { cartItems: [], shippingAddress: { location: {}}, PaymentMethod: '', }, 
        };
        case 'CART_CLEAR_ITEMS': 
            return { ...state, cart: { ...state.cart, cartItems: [] }
        };
        case 'SAVE_SHIPPING_ADDRESS':
            return { ...state, 
                cart: { ...state.cart, shippingAddress: { ...state.cart.shippingAddress, ...action.payload, }, 
                }, 
        };
        case 'SAVE_PAYMENT_METHOD':
            return { ...state, cart: { ...state.cart, PaymentMethod: action.payload,},
        };
        default: 
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}