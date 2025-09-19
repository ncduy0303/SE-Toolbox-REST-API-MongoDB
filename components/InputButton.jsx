'use client'

import { Plus } from 'lucide-react'

const InputButton = ({ onClick }) => {
  return (
    <div className="flex bg-red-100 justify-end px-6 py-4 rounded-lg">
      <button
        className="flex items-center text-white transition ease-in-out delay-50 bg-gray-900 hover:scale-105 hover:bg-gray-800 duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={onClick}
      >
        <Plus className="pr-2" /> Add address
      </button>
    </div>
  )
}

export default InputButton
