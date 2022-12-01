import React, { useEffect, useState } from 'react';
import "./CartPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addShippingToCart, addToCart, deleteProductInCart, getCart } from '../../actions/cartActions';
import AmountButtons from '../../components/AmountButtons';
import { listProductDetails } from '../../actions/productActions';
import { AddToCart } from '../../components';
import Item from './Item';
import { CART_LIST_SUCCESS } from '../../constants/cartsConstants';
import Loader from '../../components/Loader';

const CartPage = () => {
    let location = useLocation();
    const productId = useParams().id
    // const [amount, setAmount] = useState(1);

    // const [total, setTotal] = useState(0);
    // console.log('==', productId)
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1
    // console.log('==', quantity)

    const userLogin = useSelector((state) => state.userLogin)
    console.log(userLogin.userInfo);

    const dispatch = useDispatch()

    const navigate = useNavigate()
  
    const {carts} = useSelector(state => state.cartList)
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    console.log(product);

    useEffect(() => {
        dispatch(getCart())
        dispatch(listProductDetails(productId))
    }, [error,productId])
    // const { cartItems } = cart
    console.log('-=-=', carts)


    const [total, setTotal] = useState(0)

    const [tien, setTien] = useState(0)

    console.log(total);
    // console.log(tien?.data?.totalPrice);

    const funcTinh = (x) => {
        console.log("truyền ngược: ", x);
        setTotal(total + x)
        // setTien(total)
        // console.log(tien);
    }

  
    

    // //nút cộng trừ
    // const increase = (quantity, productId) => {
    // //   setAmount((old) => {
    //     let temp = quantity + 1;
    //     if (temp > product?.data?.quantity) temp = product?.data?.quantity;
    //     setAmount(temp);
    //     console.log(productId);
    //     console.log('giam: ', temp);
    //     dispatch(addToCart(productId, 1));
    //     return temp;
    // //   });

    // };
    // const decrease = (quantity, productId) => {
    // //   setAmount((old) => {
    //     let temp = quantity - 1;
    //     if (temp < 1) temp = 1;
    //     setAmount(temp);
    //     console.log(productId);
    //     console.log("tăng",temp);
    // dispatch(addToCart(productId, temp));
    //     return temp;
    // //   });
    // };

    // const [counter, setCounter] = useState(0);

    // const initState = (x) =>{
    //     setCounter((counter) => counter + x)
    // }
    // const incrementCounter = () => setCounter(counter + 1);
    // let decrementCounter = () => setCounter(counter - 1);

    // if(counter<=0) {
    //     decrementCounter = () => setCounter(1);
    // }


    const handlerChoose = (productId) => {
        console.log("đã chọn id: ", productId);
    }

    const removeFromCartHandler = (id) => {
        dispatch(deleteProductInCart(id, navigate))
        window.location.reload();
    }
    const emptyCartMsg = <h4 className='text-red fw-6'>Không có sản phẩm được chọn!</h4>;

    return (
        <div className="cart-page">
            <div className="container">
                <div className="breadcrumb">
                    <ul className="breadcrumb-items flex">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <i className="fas fa-home"></i>
                                <span className="breadcrumb-separator">
                                    <i className="fas fa-chevron-right"></i>
                                </span>
                            </Link>
                        </li>
                        <li>Cart</li>
                    </ul>
                </div>
            </div>
            <div className='bg-ghost-white py-5'>
                <div className='container'>
                    <div style={{ margin: '20px 0' }}>
                        <Link to="/products" className="py-3 px-5" style={{ textTransform: 'none', fontSize: '14px', border: '2px solid #cccccc', color: 'gray', textDecoration: 'none', borderRadius: '5px' }}>
                            <i style={{ fontSize: '16px', color: 'gray' }} className="fas fa-long-arrow-alt-left me-3"></i> Tiếp tục mua hàng
                        </Link>
                    </div>
                    <div className='section-title bg-ghost-white'>
                        <h3 className="text-uppercase fw-7 text-regal-blue ls-1">Giỏ hàng</h3>
                    </div>
                    {loading && <Loader />}

                    {carts?.data?.totalProduct === undefined || carts?.data?.totalProduct === 0 ? emptyCartMsg : (
                        <div className="cart-content grid">
                            <div className='cart-left'>
                                <div className="cart-items grid">
                                    {
                                        carts.data?.items?.map(cartProduct => (
                                            <Item cartProduct={cartProduct} func={funcTinh} key={cartProduct?.id} loading={loading} />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='cart-right bg-white'>
                                <div className='cart-summary text-light-blue'>
                                    {/* <div className='cart-summary-title'>
                                        <h6 className='fs-20 fw-5'>Thông tin đơn hàng</h6>
                                    </div> */}
                                    {/* <ul className = 'cart-summary-info'>
                                        <li className = "flex flex-between">
                                            <span className='fw-4'>Đã chọn {carts.data?.totalProduct} sản phẩm - Giá</span>
                                            <span className='fw-7'>{(total)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                            <span className='fw-7'>{total}</span>
                                        </li>
                                        <li className='flex flex-between'>
                                            <span className='fw-4'>Giảm giá</span>
                                            <span className='fw-7'>
                                                <span className='fw-5 text-red'>-&nbsp;</span>
                                                {formatPrice(0)}
                                            </span>
                                        </li>
                                        <li className='flex flex-between'>
                                            <span className='fw-4'>Phí vận chuyển</span>
                                            <span className='fw-7'>
                                                <span className='fw-5 text-gold'>+&nbsp;50.000VND</span>
                                            </span>
                                        </li>
                                    </ul> */}
                                    <div className='cart-summary-total flex flex-between fs-18'>
                                        <span className='fw-6'>Tổng cộng: </span>
                                        <span className='fw-6'>
                                            {(carts.data?.totalPrice + total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                        </span>
                                    </div>
                                    <div className='cart-summary-btn'>
                                        {userLogin.userInfo ? (
                                            <Link to={`/shipping/${carts?.data?.id}`}>
                                                <button className="btn-secondary">
                                                    Thanh toán
                                                </button>
                                            </Link>
                                        ) : (
                                            <button type="button" onClick={null} className="btn-secondary">
                                                Đăng nhập để thanh toán
                                            </button>
                                        )}
                                    </div>
                                    {/* <button type = "button" className='btn-secondary'>Proceed to Checkout</button> */}
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default CartPage