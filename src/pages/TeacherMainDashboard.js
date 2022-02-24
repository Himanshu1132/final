import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { activeAccount } from '../actions';

export default function TeacherMainDashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(activeAccount());
      },[])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
