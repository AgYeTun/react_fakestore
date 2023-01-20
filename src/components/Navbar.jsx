import React from 'react'
import {FaShopify, FaSearch, FaShoppingCart} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {

    const {search , setSearch, state: {cart}} = useStateContext()

  return (
    <div className='bg-white my-5 flex items-center justify-between py-2 px-5 rounded-lg shadow-md'>
        <Link to={"/"}>
            <div className='flex items-center gap-2 cursor-pointer'>
                <FaShopify className='text-3xl text-txt'/>
                <h1 className='text-xl uppercase font-bold tracking-wider text-txt'>fakeshop</h1>
            </div>
        </Link>
        <div className='flex items-center gap-2'>
            <Link to={'/cart'}>
                <div className='flex items-center bg-txt gap-2 px-2 py-1 rounded-lg cursor-pointer'>
                    <FaShoppingCart className='text-primary'/>
                    <small className='text-primary'>{cart.length}</small>
                </div>
            </Link>
            <div className='flex gap-1 items-center border-2 border-txt rounded-lg px-2'>
                <FaSearch className='text-txt cursor-pointer'/>
                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className='outline-none bg-transparent' placeholder='Search...' />
            </div>
        </div>
    </div>
  )
}

export default Navbar