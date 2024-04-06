import React, { useEffect, useState } from 'react'
import './overview.css'

import { LuRefreshCw } from "react-icons/lu"
import MapComponent from './DirectionMap'

const Overview = ({ basicData }) => {

    const [bids, setBids] = useState([])

    const [userId, setUserId] = useState('')

    const [message, setMessage] = useState('')
    const [isLowerBid, setIsLowerBid] = useState({ status: false, id: '' })
    const [selectedItem, setSelectedItem] = useState({ amount: 0, id: '' })

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime)
        const localeString = date.toLocaleString()
        return localeString
    }

    const getCurrentBids = async () => {
        if (localStorage.getItem("userId")) {
            const response = await fetch(
                "http://localhost:5001/api/delivery/getbids",
                {
                    method: "POST",
                    headers: {
                        Accept: "Application/json",
                        "Content-Type": "Application/json",
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId')
                    }),
                }
            )

            const data = await response.json()

            if (data.status === 200) {
                setBids(data.bids)
            }
        }
    }
    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            getCurrentBids(userId)
            setUserId(userId)
        }
    }, [])

    const refreshBids = () => {
        getCurrentBids(localStorage.getItem('userId'))
    }

    const joinWaitList = async (deliveryId) => {
        const response = await fetch(
            "http://localhost:5001/api/delivery/joinwaitlist",
            {
                method: "POST",
                headers: {
                    Accept: "Application/json",
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    userId,
                    deliveryId
                }),
            }
        )

        const data = await response.json()

        if (data.status === 200) {
            setMessage(data.message)
        } else setMessage(data.message)

        setTimeout(() => {
            setMessage('')
        }, 3000);
    }

    const lowerBid = async () => {
        const response = await fetch(
            "http://localhost:5001/api/delivery/lowerbid",
            {
                method: "POST",
                headers: {
                    Accept: "Application/json",
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    userId,
                    deliveryId: selectedItem.id,
                    lowerAmount: selectedItem.amount,
                }),
            }
        )

        const data = await response.json()

        if (data.status === 200) {
            setMessage(data.message)
            getCurrentBids()
            setIsLowerBid({ status: false, id: '' })
        } else setMessage(data.message)

        setTimeout(() => {
            setMessage('')
        }, 3000);
    }

    return (
        <div className='overview-container'>

            <div className="overview">
                <div className="card">
                    {/* <IoIosPerson /> */}
                    <div className="card-content1">
                        <h3>Total Drivers</h3>
                        <p>{basicData.driversCount}</p>
                    </div>
                </div>
                <div className="card">
                    {/* <img alt={title} /> */}
                    <div className="card-content2">
                        <h3>Customers</h3>
                        <p>{basicData.customersCount}</p>
                    </div>
                </div>
                <div className="card">
                    {/* <img alt={title} /> */}
                    <div className="card-content3">
                        <h3>On going Fleets</h3>
                        <p>{basicData.fleetCount}</p>
                    </div>
                </div>
            </div>
            <div className="chart2">
                <MapComponent />
            </div>
            <div className="contents-driver">
            </div>
            <div className="location-details">
                <div className='driver-details'>
                    <h4> Customer details</h4>
                    {basicData && basicData.customersList && basicData.customersList.map((value, key) => {
                        if (key == 0)
                            return (<div key={key}></div>)
                        return (
                            <div key={key}>
                                <p>Customer {key}: </p>
                                <p>Email: {value.email}</p>
                                <p>Mobile: {value.mobileNumber}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='driver-bid-container'>
                <div className='driver-refresh-container'>
                    <button className='driver-refresh-button' onClick={() => refreshBids()}><LuRefreshCw /> Refresh</button>
                </div>
                <p className='driver-bid-message'>{message}</p>
                {isLowerBid.status && <div className='lower-amount'>
                    <div>
                        <label htmlFor="lower-amount">Enter the lower amount: </label>
                        <input type="number" required value={selectedItem.amount} onChange={(e) => setSelectedItem({ ...selectedItem, amount: e.target.value })} />
                    </div>
                    <div >
                        <button className='bid-options' onClick={() => setIsLowerBid({ status: false })}>Cancel</button>
                        <button className='bid-options' onClick={() => lowerBid()}>Submit</button>
                    </div>
                </div>}
                <div className='driver-bids-list' id='open-bidding-request'>
                    {bids.length === 0 && <h2>No current open bids</h2>}
                    {bids.map((value, key) => {
                        return (<div className='driver-bid' key={key}>
                            <p><h3>Name</h3>{value.name}</p>
                            <p><h3>Source Destination</h3>{value.source}</p>
                            <p><h3>Final Destination</h3>{value.destination}</p>
                            <p><h3>Current Price</h3>{value.currentBiddingPrice}</p>
                            <p><h3>End Time</h3>{formatDateTime(value.bidEndDate)}</p>
                            <img src={value.image} alt="" width={50} height={50}/>
                            {value.currentWaitList.length >= 1 && value.currentWaitList[0].userId === userId ?
                                <p>You are in the top of waiting list</p> :
                                <button className="join-waiting-list" onClick={() => joinWaitList(value._id)}>Join Wait-List</button>
                            }
                            <button className="button-lower-bid" onClick={() => {
                                setSelectedItem({ id: value._id, amount: 0 })
                                setIsLowerBid({ status: true, id: value._id })
                            }}>Lower bid</button>
                        </div>)
                    })}
                </div>
            </div>



        </div>
    )
}

export default Overview
