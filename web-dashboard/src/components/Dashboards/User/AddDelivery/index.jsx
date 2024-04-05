import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    console.log(deliveryData)
  }, [deliveryData])

  const onSubmit = async () => {

  }

  const handleImageInput = (e) => {
    const imageFile = e.target.files[0]
    setDeliveryData({ ...deliveryData, image: imageFile })
  }

  return (
    <>
      <div className="add-delivery-container">
        <form className='add-delivery-form' onSubmit={() => onSubmit()}>
          <h3>Fill the details of your request</h3>
          <input type="text" name="name" value={deliveryData.name} onChange={(e) => setDeliveryData({ ...deliveryData, name: e.target.value })} placeholder='Enter name of the goods' required />
          <input type="text" name="source" value={deliveryData.source} onChange={(e) => setDeliveryData({ ...deliveryData, source: e.target.value })} placeholder='Enter source address coordinates' required />
          <input type="text" name="destination" value={deliveryData.destination} onChange={(e) => setDeliveryData({ ...deliveryData, destination: e.target.value })} placeholder='Enter destination address coordinates' required />
          <input type="text" name="goodsType" value={deliveryData.goodsType} onChange={(e) => setDeliveryData({ ...deliveryData, goodsType: e.target.value })} placeholder='Enter goods type' required />
          <textarea rows={5} cols={30} name="goodsDesription" value={deliveryData.goodsDesription} onChange={(e) => setDeliveryData({ ...deliveryData, goodsDesription: e.target.value })} placeholder='Enter description of goods' required />
          <input type="file" id="image" name="image" accept="image/*" onChange={(e) => { handleImageInput(e) }} required />
          {deliveryData.image && <img src={URL.createObjectURL(deliveryData.image)} alt="uploadedImage" width={100} height={100} />}
          <button className='add-delivery-request-button'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddDelivery