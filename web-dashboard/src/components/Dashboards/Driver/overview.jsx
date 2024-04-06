import React, { useEffect, useState } from 'react'
import './overview.css'

import { LuRefreshCw } from "react-icons/lu"

const Overview = ({ totaldriver, totalcustomer, ongoingfleet }) => {

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
                        userId: localStorage.getItem("userId")
                    }),
                }
            )

            const data = await response.json()

            if (data.status === 200) {
                setBids(data.bids)
                console.log(data.bids)
            }
        }
    }
    useEffect(() => {
        getCurrentBids()
        setUserId(localStorage.getItem('userId'))
    }, [])

    const refreshBids = () => {
        getCurrentBids()
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
                    userId: localStorage.getItem("userId"),
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
                    userId: localStorage.getItem("userId"),
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
                        <p>3</p>
                    </div>
                </div>
                <div className="card">
                    {/* <img alt={title} /> */}
                    <div className="card-content2">
                        <h3>Customers</h3>
                        <p>354</p>
                    </div>
                </div>
                <div className="card">
                    {/* <img alt={title} /> */}
                    <div className="card-content3">
                        <h3>On going Fleets</h3>
                        <p>5</p>
                    </div>
                </div>
            </div>
            <div className="charts">
                <div> Driver details</div>
            </div>
            <div className="contents-driver">
            </div>
            <div className="location-details">
                <div className='driver-details'>Driver details</div>
                <div className='locations'>Locations</div>
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
                    <div>
                        <button onClick={() => setIsLowerBid({ status: false })}>Cancel</button>
                        <button onClick={() => lowerBid()}>Submit</button>
                    </div>
                </div>}
                {bids.length !== 0 &&
                    <div className='driver-bid-header'>
                        <p>Name</p>
                        <p>Source</p>
                        <p>Destination</p>
                        <p>Current-Price</p>
                        <p>BidEndTime</p>
                    </div>
                }
                <div className='driver-bids-list'>
                    {bids.map((value, key) => {
                        return (<div className='driver-bid' key={key}>
                            <p>{value.name}</p>
                            <p>{value.source}</p>
                            <p>{value.destination}</p>
                            <p>{value.currentBiddingPrice}</p>
                            <p>{formatDateTime(value.bidEndDate)}</p>
                            {value.currentWaitList[0].userId === userId ?
                                <p>You are in the top of waiting list</p> :
                                <button onClick={() => joinWaitList(value._id)}>Join Wait-List</button>
                            }
                            <button onClick={() => {
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
