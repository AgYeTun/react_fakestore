import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'

const Card = ({product}) => {
  const {dispatch} = useStateContext()

  return (
    <div className='w-72 p-5 bg-white rounded-lg shadow transform transition hover:scale-105 hover:shadow-lg'>
        <img src={product?.image} className="h-[200px] mx-auto my-3" alt="" />
        <h3 className='font-bold tracking-wider my-3 cursor-pointer'>{product?.title?.substring(0, 20)} ...</h3>
        <div className='flex item-center gap-2'>
            <AiFillStar className='text-info' />
            <small className='text-gray-400 font -bold'>( {product.rating?.rate} )</small>
        </div>
        <p className='text-xl my-1 '>$ {product.price}</p>
        <div className='flex gap-3 mt-3'>
            <button onClick={()=> dispatch({type:"ADD_TO_CART", payload: product})} className='bg-txt text-primary px-3 py-1 rounded transform transition hover:scale-110 hover:shadow'>Add to cart</button>
            <Link to={`/detail/${product.id}`}>
              <button className='bg-info text-primary px-3 py-1 rounded transform transition hover:scale-110 hover:shadow'>Details</button>
            </Link>
        </div>
    </div>
  )
}

export default Card