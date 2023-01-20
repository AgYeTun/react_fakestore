import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../Api'
import {AiFillStar} from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import Spinner from '../spinner/spinner'

const ProductDetail = () => {

  const {dispatch} = useStateContext()

    const {id} = useParams()

    const [product, setProduct] = useState({})
    const [products, setProducts] = useState([])

    const getDetail = async() => {
        setProduct(await getData(`/products/${id}`))
    }

    const getProductsByCat = async() => {
      const data = await getData(`/products/category/${product.category}`)
      const filterData = data?.filter(item => item.id !== product.id)
      // console.log(filterData);
      setProducts(filterData)
    }

    useEffect(()=>{
      getDetail()
      // getProductsByCat()
    },[])

    useEffect(()=> {
      getProductsByCat()
    },[product])
    // console.log(products);

  return (
    <>
    {product && products.length > 0 ? (
    <div className=''>
      <div className="flex gap-7 my-20">
        <img src={product?.image} alt="" className='w-72 shadow-xl rounded-lg border' />
        <div className="flex flex-col gap-5 py-5">
          <p className='bg-primary px-5 rounded-full text-xs text-txt font-bold shadow mr-auto cursor-default'>{product?.category}</p>
          <h1 className='font-bold text-txt text-2xl cursor-default'>{product?.title}</h1>
          <div className="flex flex-col mt-4 cursor-default">
            <h2 className='font-bold text-sm text-txt'>Description</h2>
            <p className='text-gray-400 tracking-wider leading-6 text-sm'>{product?.description}</p>
          </div>
          <div className="flex gap-2 items-center">
            <AiFillStar className='text-yellow-400 text-xl'/>
            <p className=' text-gray-400 text-sm cursor-default'>( {product?.rating?.rate} )</p>
          </div>
          <p className='text-lg text-txt cursor-default'>$ {product?.price}</p>
          <div className="flex gap-4">
            <button onClick={()=> dispatch({type:"ADD_TO_CART", payload: product})} className='bg-txt text-primary py-1 px-3 shadow rounded transform transition hover:scale-105 hover:shadow-lg'>Add to Cart</button>
            <Link to={'/success'}>
              <button className='bg-info text-primary py-1 px-3 shadow rounded transform transition hover:scale-105 hover:shadow-lg'>Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="my-20">
        <h1 className='text-xl font-bold text-txt'>You may also like</h1>
        <div className="flex flex-wrap gap-7 my-10">
          {products?.map(item => (
            <Link to={`/detail/${item?.id}`} key={item?.id}>
              <div onClick={() => setProduct(item)}>
                <img src={item?.image} className="h-48 bg-white border-2 shadow-lg p-5 rounded-lg" alt="" />
                <p className='text-gray-info font-bold mt-1 text-sm ml-2'>$ {item?.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>) : (
      <Spinner/>
    )}
    </>
    
  )
}

export default ProductDetail