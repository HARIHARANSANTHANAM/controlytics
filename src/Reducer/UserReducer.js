const UserReducer=(state={},action)=>{
    switch(action.type)
    {
        case "SIGN_UP": {console.log(action.payload); return {...state,user:action.payload}}
        default:return state;
    }
}


export default UserReducer;