const initialState = [];

const userDetails = (state = initialState,action) =>{
    switch (action.type){
        case "FETCH_STUDENT" : 
            return {...state,initialState:action.payload};
        case "REMOVE_STUDENT":
            return initialState;
        default:
            return{...state};
    }
}
export default userDetails;