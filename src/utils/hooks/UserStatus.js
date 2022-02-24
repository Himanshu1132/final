import Axios from 'axios';
import { useLayoutEffect, useState } from 'react'

function UserStatus() {

    //checking local storage have a data
    const localStorageCheck =() =>{
        if(localStorage.getItem("usValues") !== null){
            if(Object.keys(JSON.parse(localStorage.getItem("usValues"))).length === 0){
                return (false);
            }
            else{
                return (true);
            }
        }
        else{
            return(false);
        }
    }

    const [log, setlog] = useState(true);

    const hadelLogOut = () =>{
        if(Object.keys(JSON.parse(localStorage.getItem("usValues"))).length !== 0){
            Axios.delete(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/logout/`,{
                headers: {Authorization: "Token " + JSON.parse(localStorage.getItem("usValues")).key}
            })

            localStorage.setItem("usValues",JSON.stringify({}));

        }
        setlog(false);
    }

    useLayoutEffect(() => {
        if (!localStorageCheck()) {
            setlog(false);
        }
    });

    return ({log,hadelLogOut})
}

export default UserStatus
