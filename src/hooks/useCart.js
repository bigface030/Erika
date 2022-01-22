import { useDispatch } from "react-redux";
import { deleteCart, setCartQty } from "../features/cart/cartSlice";

export default function useCart (item) {

    const dispatch = useDispatch()

    const handleDeleteCart = index => () => {
        dispatch(deleteCart(index))
        let cartLocal = JSON.parse(localStorage.getItem('cart')) || [];
        cartLocal = cartLocal.filter((item, i) => i !== index)
        localStorage.setItem('cart', JSON.stringify(cartLocal))
    }

    const handleQtyChange = e => {
        if(!e.target.value) return
        dispatch(setCartQty({pattern_id: item.pattern_id, qty: parseInt(e.target.value)}))
        let cartLocal = JSON.parse(localStorage.getItem('cart')) || [];
        cartLocal = cartLocal.map(i => {
            if(i.pattern_id === item.pattern_id){
                i.qty = parseInt(e.target.value)
            }
            return i
        })
        localStorage.setItem('cart', JSON.stringify(cartLocal))
    }

    const handleBtnClick = (direction) => {
        let cartLocal = JSON.parse(localStorage.getItem('cart')) || [];
        if(direction === 'inc') {
            dispatch(setCartQty({pattern_id: item.pattern_id, qty: item.qty+1}))
            cartLocal = cartLocal.map(i => {
                if(i.pattern_id === item.pattern_id){
                    i.qty += 1
                }
                return i
            })
        }
        if(direction === 'dec') {
            if(item.qty<=1) return 
            dispatch(setCartQty({pattern_id: item.pattern_id, qty: item.qty-1}))
            cartLocal = cartLocal.map(i => {
                if(i.pattern_id === item.pattern_id){
                    i.qty -= 1
                }
                return i
            })
        }
        localStorage.setItem('cart', JSON.stringify(cartLocal))
    }

    const getTotal = cart => {
        if(cart.length === 0) return
        return cart.map(item => 
            (item.is_sale ? item.price_sale : item.price_standard) * item.qty
        ).reduce((acc, cur) => acc + cur)
    }

    const hasError = errorMessage => {
        if(!errorMessage.length) return false
        return errorMessage.some(err => err)
    }

    return {
        handleDeleteCart,
        handleQtyChange,
        handleBtnClick,
        getTotal,
        hasError
    }
}