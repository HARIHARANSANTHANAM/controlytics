const CreateAccount=(user)=>{
return {
    type:'SIGN_UP',
    payload:user
}
}

export default CreateAccount;