const accountDetailsReducer = (state="",action)=>{
    switch (action.type){
        case "CHECK_IS_LOGGED":
            if(localStorage.getItem("usValues") !== null){
                if(Object.keys(JSON.parse(localStorage.getItem("usValues"))).length === 0){
                    localStorage.setItem("usValues",JSON.stringify({}));
                    state = "";
                    return state;
                }
                else{
                    let userLocalValues = JSON.parse(localStorage.getItem("usValues"));
                    let user = userLocalValues.user
                    let key = userLocalValues.key
                    userLocalValues ={key:key,...user}
                    return userLocalValues;
                }
            }
            else{
                state = "";
                return state;
            }
        default : return state;
    }
}

export default accountDetailsReducer;