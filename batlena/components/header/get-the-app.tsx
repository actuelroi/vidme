import React from 'react'
import { FaArrowCircleDown } from 'react-icons/fa'

const GetTheApp = () => {
  return (
    <div className='flex items-center gap-3 bg-accent rounded-md cursor-pointer p-2'>
        <FaArrowCircleDown/>
        <span>Telecharger l'appli</span>
        
    </div>
  )
}

export default GetTheApp
