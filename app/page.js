'use client'

import AddressCardList from '@/components/AddressCardList'
import InputButton from '@/components/InputButton'
import { useState } from 'react'

const Home = () => {
  const [showForm, setShowForm] = useState(false)

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <InputButton onClick={handleShowForm} />
        <div className="bg-green-200 rounded-lg p-6 mt-4">
          <AddressCardList showForm={showForm} onFormClose={handleCloseForm} />
        </div>
      </div>
    </div>
  )
}

export default Home
