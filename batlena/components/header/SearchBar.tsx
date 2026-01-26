import React from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='relative flex items-center w-80'>
      <SearchIcon className='absolute left-3 h-4 w-4 text-gray-400' />
      <Input 
        placeholder='Que recherchez vous..' 
        className='pl-10 pr-4 h-10 border-gray-300 focus:border-purple-500'
      />
    </div>
  )
}

export default SearchBar