import React from 'react'

const Spinner = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='border-4 absolute bottom-44 border-t-transparent rounded-full
        animate-spin w-full h-full border-white'/>

      <div className='border-4 absolute left-44 border-t-transparent rounded-full
        animate-spin w-full h-full border-white'/>

      <div className='border-4 absolute right-44 border-t-transparent rounded-full
        animate-spin w-full h-full border-white'/>

      <div className='border-4 absolute top-44 border-t-transparent rounded-full 
        animate-spin w-full h-full border-white'/>
    </div>
  )
}

export default Spinner
