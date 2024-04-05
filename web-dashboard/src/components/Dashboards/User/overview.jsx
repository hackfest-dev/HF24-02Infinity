import React from 'react';
import './overview.css';
import AddDelivery from './AddDelivery';

const Overview = ({ totaldriver, totalcustomer, ongoingfleet }) => {
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

            </div>
            <div className="contents-driver">
            </div>
            <div className="location-details">
                <div>driver details</div>
                <div>driver details</div>
            </div>

            <section id="add-delivery-request">
                <AddDelivery />
            </section>

        </div>
    )
}

export default Overview;
