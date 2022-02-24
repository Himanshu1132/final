import Axios from "axios"

//action creator
export const loadStDetails = () => async (dispatch) =>{
    //fetch 
    if(localStorage.getItem("usValues") !== null){
        if(Object.keys(JSON.parse(localStorage.getItem("usValues"))).length !== 0){
            const userLocalValues = JSON.parse(localStorage.getItem("usValues"));
            const stDetails = await Axios.get(`${process.env.REACT_APP_LMS_MAIN_URL}/account-api/stuprofile/${userLocalValues.user.id}/`,{
                headers:{Authorization:'Token '+userLocalValues.key}
            })
            dispatch({
                type:"FETCH_STUDENT",
                payload: stDetails.data
            })
        }
        else{
            dispatch({
                type:'REMOVE_STUDENT',
            });
        }
    }
    else{
        dispatch({
            type:'REMOVE_STUDENT',
        });
    }


}