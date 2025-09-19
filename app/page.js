import AddressCardList from '@/components/AddressCardList'
import InputButton from '@/components/InputButton'
import Image from 'next/image'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <InputButton />
        <div className="bg-green-200 rounded-lg p-6 mt-4">
          <AddressCardList />
        </div>
      </div>
    </div>
  )
}

export default Home
