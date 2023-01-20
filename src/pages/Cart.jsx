import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'

const Cart = () => {
    const {state:{cart}, dispatch} = useStateContext();

    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const checkoutHandler = () => {
        dispatch({type:"CART_EMPTY"});
        navigate('/success')
    } 

    useEffect(() => {
        setTotal(cart.reduce((pre, current) => pre + current.subTotal, 0))
    },[cart])

    
    console.log(cart);

  return (
    <>
    {
        cart.length > 0 ? (
            <div className="grid grid-cols-10">
                <div className='col-span-7 flex flex-col my-10 divide-y-2 pr-10'>
                    {cart?.map(item => (
                        <div key={item.id} className="flex items-center gap-4 py-4">
                            <img src={item?.image} className="h-32 border-2 rounded p-4 bg-white" alt="" />
                            <div className="">
                                <h3>{item?.title}</h3>
                                <p >$ {item?.price}</p>
                                <div className="flex gap-1 items-center">
                                    <button onClick={() => dispatch({type:"CART_DECREASE", payload: item})} className='bg-white w-6 border'>-</button>
                                    <p className='bg-white w-6 border text-center'>{item?.qty}</p>
                                    <button onClick={() => dispatch({type:"CART_INCREASE", payload: item})} className='bg-white w-6 border'>+</button>
                                </div>
                                <p>Subtotal - ${item?.subTotal}</p>
                                <button onClick={()=> dispatch({type:"REMOVE_FROM_CART", payload: item})}>
                                    <AiFillDelete className='text-2xl'/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-span-3">
                    <div className=" flex flex-col px-5 py-14 rounded shadow-lg bg-danger my-10">
                        <div className="mb-5 flex items-center gap-2 mx-5">
                            <h1 className='text-txt text-2xl font-semibold '>Total Price</h1>
                            <span className='text-txt font-bold text-2xl'>-</span>
                            <span className='text-txt font-bold text-4xl'>${total.toFixed(2)}</span>
                        </div>
                        <button onClick={checkoutHandler} className='mx-5 py-1 rounded bg-txt text-primary uppercase shadow-lg transform transition hover:scale-105 hover:shadow-xl'>Checkout</button>
                    </div>
                    <div className="flex flex-col gap-2 px-10">
                        <button onClick={()=> navigate('/')} className="bg-txt text-primary px-4 py-1 rounded shadow-lg transform transition hover:scale-105 hover:shadow-xl">Continue Shopping</button>
                        <button onClick={()=> dispatch({type:"CART_EMPTY"})} className="bg-red-500 text-primary px-4 py-1 rounded shadow-lg transform transition hover:scale-105 hover:shadow-xl">Empty cart</button>
                    </div>
                </div>
            </div>

        ) : (
            <div className='flex justify-center '>
                <div className="bg-txt p-20 flex flex-col gap-7 rounded-lg shadow-xl my-32 animate__animated animate__backInDown">
                    <h1 className='text-4xl text-primary font-bold tracking-wider'>Your cart is empty !</h1>
                    <button onClick={() => navigate('/')} className='bg-info text-primary px-5 py-2 mx-auto rounded shadow-sm transform transition hover:scale-105 hover:shadow-lg'>Continue Shopping</button>
                </div>
            </div>
        )
    }
    </>
  )
}

export default Cart