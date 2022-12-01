import React, {useEffect, useState} from 'react';
import "./CartPage.scss";
import { useDispatch } from 'react-redux';
import { useNavigate} from "react-router-dom";
import { addToCart, deleteProductInCart, getCart } from '../../actions/cartActions';
import Loader from '../../components/Loader';

const Item = ({cartProduct,func, key, loading} ) => {
    // console.log("sdhabdjhsdh: ",cartProduct.name);
    const [counter, setCounter] = useState(cartProduct.quantity);
    const [chanTru, setChanTru] = useState(false)
    const [chanCong, setChanCong] = useState(false)
    const totalPrices = () => {
        return (cartProduct.price / cartProduct.quantity)
    }
    
    const unTotalPrices = () => {
        return (cartProduct.price / cartProduct.quantity) * (-1)
    }

    const dispatch = useDispatch()
  
    
    const navigate = useNavigate()
    // const func = () =>{
    //     console.log("DOI: ");
    //     dispatch(addShippingToCart(cartProduct.itemId, cartProduct))
    console.log(counter);
    console.log(cartProduct.totalquanlityproduct);
    // if(counter >= cartProduct.totalquanlityproduct) //max -1
    // {
    //     setChanCong(true)
    // }
    // }
    const incrementCounter = () => {
        // setChanTru(false)
        if(counter >= cartProduct.totalquanlityproduct)
        {
            setChanCong(true)
            setChanTru(false)
            return;
        }else {
            func(totalPrices())
            setChanCong(false)
        }
        // setChanCong(false)
        setCounter(counter + 1);
        // console.log(cartProduct.productid);
        // console.log(counter+1);
        dispatch(addToCart(cartProduct.productid, 1))
    }
    let decrementCounter = () => {
        func(unTotalPrices())
        setChanCong(false)
        setChanTru(false)
        if(counter <= 2)
        {
            setChanTru(true)
            // setChanCong(false)
        }
        setCounter(counter - 1)
        console.log(cartProduct.productid);
        console.log(counter-1);
        dispatch(addToCart(cartProduct.productid, -1))
    };

    // useEffect(()=>{
    //     // dispatch(addShippingToCart(cartProduct.itemId, counter))
    //     // func(totalPrices())
    
    // },[counter])

    if(counter<=0) {
        decrementCounter = () => setCounter(1);
    }

    const handlerChoose  = (productId) =>{
        console.log("đã chọn id: ", productId);
    }

    const removeFromCartHandler = (id) => {
        dispatch(deleteProductInCart(id))
        // dispatch(getCart())
        window.location.reload();
    }
    const emptyCartMsg = <h4 className='text-red fw-6'>Không có sản phẩm được chọn!</h4>;

    return (
    <div className='cart-item grid' key={key}>
    {loading && <Loader />}
        <div className='cart-item-img flex flex-column bg-white'>
            <img src = {cartProduct?.image[0]?.url} alt = {cartProduct.name} />
            <button key={key} type = "button" className='btn-square rmv-from-cart-btn' onClick={() => removeFromCartHandler(cartProduct?.itemId)}>
                <span className='btn-square-icon'><i className='fas fa-trash'></i></span>
            </button>
        </div>

        <div className='cart-item-info'>
            <h6 className='fs-16 fw-5 text-light-blue'>{cartProduct.name}</h6>
            <div className = "qty flex">
                <span className = "text-light-blue qty-text">Số lượng: </span>
                <div className = "qty-change flex">
                <button type = "button" className='qty-dec fs-14'
                // onClick={() => decrease(cartProduct.quantity, cartProduct.itemId)}
                onClick={decrementCounter}
                disabled={chanTru}
                >
                    <i className = "fas fa-minus text-light-blue"></i>
                </button>
                {/* <input
                    value={counter}
                    // key={cartProduct.id}
                >
                    {counter}
                </input> */}
                <span className = "qty-value flex flex-center">{counter}</span>
                <button type = "button" className='qty-inc fs-14 text-light-blue'
                //  onClick={() => increase(cartProduct.quantity, cartProduct.itemId)}
                onClick={incrementCounter}
                disabled={chanCong}
                // onChange={func}
                // key={cartProduct.itemId}
                // onChange={(key) => dispatch(addShippingToCart(cartProduct.itemId, key.target.value))}
                >
                    <i className = "fas fa-plus"></i>
                </button>
                {/* <AmountButtons
                    amount={amount}
                    increase={increase}
                    decrease={decrease}
                    key={cartProduct.itemId}

                    onChange={(key) => dispatch(addShippingToCart(cartProduct.itemId, key.target.value))}

                    onClick ={handlerChoose(cartProduct.itemId)}
                /> */}

                </div>
            </div>
            <div className = "flex flex-between">
                <div className='text-pine-green fw-4 fs-15 price'>Giá : {(cartProduct.price / cartProduct.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                <div className='sub-total fw-6 fs-18 text-regal-blue'>
                    <span>Tổng: </span>
                    <span className=''>{((cartProduct.price / cartProduct.quantity) * counter).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                </div>
            </div>
        </div>
    </div>




    )
}

export default Item