import React, { useState, useEffect } from 'react';
import './overview.css';
import AddDelivery from './AddDelivery';
import MapComponent from '../Driver/DirectionMap';
import GetPlaceName from '../Driver/maps'

const Overview = () => {

    const [userData, setUserData] = useState([])

    const getBasicData = async () => {
        if (localStorage.getItem("userId")) {
            const response = await fetch(
                "http://localhost:5001/api/dashboard/user",
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
                setUserData(data.delivery)
                console.log(data.delivery)
            }
        }
    }

    useEffect(() => {
        getBasicData()
    }, [])

    return (
        <div className='overview-container'>

            <div className="overview">
                <div className="card">
                    <div className="card-content1">
                        <h3>Logistics Status</h3>
                        {userData && userData.length > 0 &&
                            userData.map((value, key) => {
                                return (
                                    <div key={key} className='user-data'>
                                        {/* <p>{key + 1}</p> */}
                                        <p>Name: {value.name}</p>
                                        <b>{value.status}</b>
                                        {/* <p>Current Location: <GetPlaceName latitude={value.currentLocation && value.currentLocation.split(',')[0]} longitude={value.currentLocation && value.currentLocation.split(',')[1]} /></p>
                                        <p>Destination Location: <GetPlaceName latitude={value.destination && value.destination.split(',')[0]} longitude={value.destination && value.destination.split(',')[1]} /></p> */}
                                        <p>Expected Price: {value.price} Rs.</p>
                                        <p>Speed of Vehicle: {value.avgSpeed ? value.avgSpeed.toFixed(2) : '0'} km/h</p>
                                        <p>Driver's ID: {value.driverId}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <div className="overview">
                <div className="card">
                    <div className="card-content1">
                        <h3>Current Location</h3>
                        {userData && userData[0].location && userData.map((value, key) => {
                            return (
                                <p><GetPlaceName latitude={value.location.split(',')[0]} longitude={value.location.split(',')[1]} /></p>
                            )
                        })}


                    </div>
                </div>
            </div>
            <div className="overview">
                <div className="card">
                    <div className="card-content1">
                        <h3>Driver Details</h3>
                        {userData.admin &&
                            <div>
                                <p>{userData.admin.email}</p>
                                <p>{userData.admin.mobileNumber}</p>
                            </div>
                        }
                    </div>
                </div>
            </div> */}
            <div className="charts2">
                <div><MapComponent /></div>
            </div>
            {/* <div className="overview">
                <div className="card">
                    <div className="card-content1">
                        <h3>Final Location</h3>
                        <p>3</p>
                    </div>
                </div>
            </div> */}

            <section id="add-delivery-request">
                <AddDelivery />
            </section>

        </div>
    )
}

export default Overview;
