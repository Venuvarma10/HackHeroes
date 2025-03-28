import React from 'react'

const ToastMessage = ({message}) => {
  return (
    <div className='flex justify-center items-center absolute top-0 z-100'>
        <div className='flex justify-center w-[250px] bg-black p-5 rounded-[5px]'>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default ToastMessage