const AuthenticationReducer = (state, action) => {
    switch (action.type) {
        case 'Login':
            state = action.payload;
            console.log(action.payload);
            break;
    
        case 'Logout':
            state = null;
            break;
        default :
            state = null;
            break;
    }
    return state;
}
export default AuthenticationReducer;