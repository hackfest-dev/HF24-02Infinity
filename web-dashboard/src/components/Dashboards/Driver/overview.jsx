import React, { useEffect, useState } from 'react';
import './overview.css';

const Overview = ({ totaldriver, totalcustomer, ongoingfleet }) => {

    const [bids, setBids] = useState([])

    const [message, setMessage] = useState('')

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
    }, [])

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
            setMessage('Successfully added to waitingList')
            console.log(data)
        }
    }

    const lowerBid = async (deliveryId) => {
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
                    deliveryId,
                    lowerAmount: 0,
                }),
            }
        )

        const data = await response.json()

        if (data.status === 200) {
            setMessage('Successfully lowered the bid')
            console.log(data)
        }
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
                            <button onClick={() => joinWaitList(value._id)}>Join Wait-List</button>
                            <button onClick={() => lowerBid(value._id)}>Lower bid</button>
                        </div>)
                    })}
                </div>
            </div>


        </div>
    );
}

export default Overview;
