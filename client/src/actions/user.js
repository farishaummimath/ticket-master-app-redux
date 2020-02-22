import axios from '../config/axios'
import swal from 'sweetalert2'

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const removeUser = ()=>{
    return {
        type: 'REMOVE_USER'
    }
}

export const startSetUser = (login,redirect) => {
    return(dispatch=>{
        axios.post('/users/login',login)
        .then(response => {
            if(response.data.hasOwnProperty('errors')) {
                swal.fire(`${response.data.errors}`," ","error")

            } else {
                swal.fire('Successfully logged in',"","success")
                localStorage.setItem('authToken',response.data.token)
                dispatch(setUser(response.data.user))
                redirect()
                document.location.reload()
            }
        })
    })
    
}

export const startAddUser = (register,redirect) => {
    return(dispatch => {
        axios.post('/users/register',register)
        .then(response => {
            if(response.data.hasOwnProperty('errors')) {
                swal.fire(`${response.data.errors}`," ","error")

            } else {
                swal.fire("Successfully Registered ","","success")
                localStorage.setItem('authToken',response.data.token)
                redirect()
                dispatch(setUser(response.data.user))

            }
        })
    })
    
}

export const startRemoveUser = () =>{
    return(dispatch=>{
        axios.delete('/users/logout',{
            headers : {
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.errors){
                alert(response.data.message)
            } else {
                localStorage.clear()
                dispatch(removeUser())
            }
        })
    })
}

