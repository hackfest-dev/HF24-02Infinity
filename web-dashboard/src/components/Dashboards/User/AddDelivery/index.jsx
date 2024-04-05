import React, { useState } from 'react'
import './index.css'

const AddDelivery = () => {

  const [deliveryData, setDeliveryData] = useState({
    name: '',
    source: '',
    destination: '',
    goodsType: '',
    goodsDescription: '',
    image: null,
  })

  return (
    <>
      <div className="add-delivery-container">
        <form className='add-delivery-form'>
          <h3>Fill the details of your request</h3>
          <input type="text" name="name" value={deliveryData.name} onChange={(e) => setDeliveryData({ ...deliveryData, name: e.target.value })} />
          <input type="text" name="source" value={deliveryData.source} onChange={(e) => setDeliveryData({ ...deliveryData, source: e.target.value })} />
          <input type="text" name="destination" value={deliveryData.destination} onChange={(e) => setDeliveryData({ ...deliveryData, destination: e.target.value })} />
          <input type="text" name="goodsType" value={deliveryData.goodsType} onChange={(e) => setDeliveryData({ ...deliveryData, goodsType: e.target.value })} />
          <textarea rows={10} cols={30} name="goodsDesription" value={deliveryData.goodsDesription} onChange={(e) => setDeliveryData({ ...deliveryData, goodsDesription: e.target.value })} />
        </form>
      </div>
    </>
  )
}

export default AddDelivery