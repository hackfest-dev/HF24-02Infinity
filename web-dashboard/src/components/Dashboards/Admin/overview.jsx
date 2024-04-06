import React, { useState, useEffect } from 'react';
import './overview.css';
import LineChart from './Charts';

const Overview = ({ basicData }) => {

    const [bids, setBids] = useState([])

    

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
        getCurrentBids()
    }, [])

    return (
        <div className='overview-container'>

            <div className="overview">
                <div className="card">
                    <div className="card-content1">
                        <h3>Total Drivers</h3>
                        <p>{basicData.driversCount}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content2">
                        <h3>Customers</h3>
                        <p>{basicData.customersCount}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content3">
                        <h3>On going Fleets</h3>
                        <p>{basicData.fleetCount}</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="overview">
                <div className="charts-line">
                    <LineChart />
                </div>
            </div>
            <div className='driver-bids-list' id='open-bidding-request'>
                {bids.length === 0 && <h2>No current open bids</h2>}
                {bids.map((value, key) => {
                    return (<div className='driver-bid' key={key}>
                        <p><h3>Name</h3>{value.name}</p>
                        <p><h3>Source Destination</h3>{value.source}</p>
                        <p><h3>Final Destination</h3>{value.destination}</p>
                        <p><h3>Current Price</h3>{value.currentBiddingPrice}</p>
                        <p><h3>End Time</h3>{formatDateTime(value.bidEndDate)}</p>
                        <img src={value.image} alt="" width={50} height={50} />
                    </div>)
                })}
            </div>

            <div className='customers'>
                <h4>Admin</h4>

            </div>
        </div>
    )
}

export default Overview;
