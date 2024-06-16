import ProductList from './ProductList'
import { setAllProductImages } from '@utils/test'

const Listing = async () => {
  await setAllProductImages()
  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-5rem)]'>
      {/* Search Filters */}
      <div className='hidden md:flex flex-col gap-6 w-[340px] border-r border-b p-4 h-full'>
        <div className='w-full border'>
          <input className='w-full p-2 outline-none focus:outline-blue-600 focus:outline' type='text' placeholder='Search' />
        </div>
        <div className='w-full'>
          <select>
            <option>Category</option>
            <option>Category</option>
            <option>Category</option>
          </select>
        </div>
      </div>
      
      <ProductList />
    </div>
  )
}

export default Listing