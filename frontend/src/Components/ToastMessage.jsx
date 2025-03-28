import React from 'react'

const ToastMessage = ({message}) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center fixed top-0 z-100'>
          <div className='flex justify-center w-full min-w-[225px] bg-gray-600 p-5 text-white rounded-[5px]'>
              <p>{message}</p>
          </div>
      </div>
    </div>
  )
}

export default ToastMessage