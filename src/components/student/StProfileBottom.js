import React from 'react'
import { useSelector } from 'react-redux';

export default function StProfileBottom() {

    const {initialState} = useSelector(state => state.StudentDetails);

    return (
        <div>
            <div className="bottom_box">
                <div className="teach_details">
                    <div>
                        <p>Email Address</p>
                        <h3>{initialState && initialState.user.email}</h3>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <h3>{initialState && initialState.user.phone_no}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
