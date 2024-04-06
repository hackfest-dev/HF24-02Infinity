import React from 'react';
import './overview.css';
import AddDelivery from './AddDelivery';
import MapComponent from '../Driver/DirectionMap';
import GetPlaceName from '../Driver/maps'

const Overview = ({ totaldriver, totalcustomer, ongoingfleet }) => {
    return (
        <div className='overview-container'>

            <div className="overview">
                <div className="card">
                    {/* <IoIosPerson /> */}
                    <div className="card-content1">
                        <h3>Logistics Status</h3>
                        <p>3</p>
                    </div>
                </div>

            </div>
            <div className="overview">
                <div className="card">
                    {/* <IoIosPerson /> */}
                    <div className="card-content1">
                        <h3>Current Location</h3>
                        <p><GetPlaceName/></p>
                    </div>
                </div>
            </div>
            <div className="charts2">
                    <div><MapComponent/></div>
            </div>
            <div className="overview">
                <div className="card">
                    {/* <IoIosPerson /> */}
                    <div className="card-content1">
                        <h3>Final Location</h3>
                        <p>3</p>
                    </div>
                </div>

            </div>
            <div className="contents-driver">
            </div>
            {/* <div className="location-details">
                <div>driver details</div>
                <div>driver details</div>
            </div> */}

            <section id="add-delivery-request">
                <AddDelivery />
            </section>

        </div>
    )
}

export default Overview;
