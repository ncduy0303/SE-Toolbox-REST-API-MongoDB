'use client'

import { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'

const AddressForm = ({ isOpen, onClose, onSave, editingAddress }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Reset form when modal opens/closes or when editing address changes
  useEffect(() => {
    if (isOpen) {
      if (editingAddress) {
        setTitle(editingAddress.title || '')
        setDescription(editingAddress.description || '')
      } else {
        setTitle('')
        setDescription('')
      }
    }
  }, [isOpen, editingAddress])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    setIsLoading(true)
    try {
      await onSave({
        title: title.trim(),
        description: description.trim()
      })
    } catch (error) {
      console.error('Error saving address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
        {/* Header - matching the card styles */}
        <div className="flex justify-between items-center bg-blue-100 rounded-lg px-6 py-4 mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h2>
          <X 
            className="cursor-pointer" 
            onClick={onClose}
            size={20}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Address title"
              required
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              placeholder="Address description"
              required
            />
          </div>

          {/* Buttons - matching InputButton styles */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg text-sm transition ease-in-out duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center text-white transition ease-in-out delay-50 bg-gray-900 hover:scale-105 hover:bg-gray-800 duration-200 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
            >
              <Save className="pr-2" size={16} />
              {isLoading ? 'Saving...' : (editingAddress ? 'Update' : 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddressForm