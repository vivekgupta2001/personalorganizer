export const loginAction = (user) => {
    return {
        type : 'Login',
        payload: user
    }
}
export const logoutAction = () => {
    return {
        type : 'Logout'
    }
}