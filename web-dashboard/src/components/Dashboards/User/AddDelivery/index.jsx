import React, { useEffect, useState } from 'react'
import './index.css'

const AddDelivery = () => {

  const [deliveryData, setDeliveryData] = useState({
    name: '',
    source: '',
    destination: '',
    weight: '',
    height: '',
    width: '',
    date: '',
    goodsDescription: '',
    image: null,
  })

  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    const userId = localStorage.getItem('userId')

    const response = await fetch(
      "http://localhost:5001/api/delivery/newrequest",
      {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          ...deliveryData, userId
        }),
      }
    )

    const data = await response.json()
    console.log(data)
    if (data.status === 200) {
      setMessage(data.message + '...You will recieve notification, once approved...')
      setTimeout(() => {
        setMessage('')
        setDeliveryData({
          name: '',
          source: '',
          destination: '',
          weight: '',
          height: '',
          width: '',
          date: '',
          goodsDescription: '',
          image: null,
        })
      }, 3000)
    } else {
      setMessage(data.message)
    }
  }

  const handleImageInput = (e) => {
    const imageFile = e.target.files[0]
    if (imageFile){
      const imageURL = URL.createObjectURL(imageFile)
      setDeliveryData({ ...deliveryData, image: imageURL })
    }else imageFile = ''
  }

  return (
    <>
      <div className="add-delivery-container">
        <form className='add-delivery-form' onSubmit={(e) => onSubmit(e)}>
          <h3>Fill the details of your request</h3>
          <input type="text" name="name" value={deliveryData.name} onChange={(e) => setDeliveryData({ ...deliveryData, name: e.target.value })} placeholder='Enter name of the goods' required />
          <input type="text" name="source" value={deliveryData.source} onChange={(e) => setDeliveryData({ ...deliveryData, source: e.target.value })} placeholder='Enter source latitude and longitudes' required />
          <input type="text" name="destination" value={deliveryData.destination} onChange={(e) => setDeliveryData({ ...deliveryData, destination: e.target.value })} placeholder='Enter destination latitude and longitudes' required />
          <input type="number" name='weight' value={deliveryData.weight} onChange={(e) => setDeliveryData({ ...deliveryData, weight: e.target.value })} placeholder='Enter weight of the goods in kilos' required />
          <input type="number" name='height' value={deliveryData.height} onChange={(e) => setDeliveryData({ ...deliveryData, height: e.target.value })} placeholder='Enter height of the goods in feets' required />
          <input type="number" name='width' value={deliveryData.width} onChange={(e) => setDeliveryData({ ...deliveryData, width: e.target.value })} placeholder='Enter width of the goods in feets' required />
          <div className='delivery-request-date'>
            <label htmlFor="date">Enter your expected date of delivery</label>
            <input type="date" id='date' onChange={(e) => setDeliveryData({ ...deliveryData, date: e.target.value })} required />
          </div>
          <textarea rows={5} cols={30} name="goodsDesription" value={deliveryData.goodsDesription} onChange={(e) => setDeliveryData({ ...deliveryData, goodsDesription: e.target.value })} placeholder='Enter description of goods' required />
          <input type="file" id="image" name="image" accept="image/*" onChange={(e) => { handleImageInput(e) }} required />
          {deliveryData.image && <img src={deliveryData.image} alt="uploadedImage" width={100} height={100} />}
          <p className='add-delivery-request-message'>{message}</p>
          <button className='add-delivery-request-button'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddDelivery