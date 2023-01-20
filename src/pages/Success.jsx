import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-center '>
        <div className="bg-txt p-20 flex flex-col gap-7 rounded-lg shadow-xl my-32 animate__animated animate__backInDown">
            <h1 className='text-4xl text-primary font-bold tracking-wider'>Thanks for Purchasing</h1>
            <button onClick={() => navigate('/')} className='bg-info text-primary px-5 py-2 mx-auto rounded shadow-sm transform transition hover:scale-105 hover:shadow-lg'>Continue Shopping</button>
        </div>
    </div>
  )
}

export default Success