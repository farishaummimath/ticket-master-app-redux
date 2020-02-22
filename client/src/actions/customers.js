import axios from '../config/axios'

import swal from 'sweetalert2'
//import {updateTicketCustomer} from '../actions/tickets'

export const setCustomers = (customer) => {
    return {
        type: 'SET_CUSTOMERS',
        payload : customer
    }
}


export const startSetCustomers = () => {
    return (dispatch) => {
        axios.get('/customers',{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
            .then(response=>{
                const customers = response.data
                dispatch(setCustomers(customers))
            })
            .catch(err=>{
                console.log(err)
            })

    }
}

export const removeCustomer = (customer) => {
    return {
        type: 'REMOVE_CUSTOMER',
        payload: customer
    }
}

export const startRemoveCustomer = (id) => {
    return (dispatch) => {
        axios.delete(`/customers/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer = response.data
            console.log("Inside start remove",customer)
            dispatch(removeCustomer(customer))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
export const addCustomer = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customer
    }
}

export const startAddCustomer = (customer,redirect) => {
    return (dispatch) => {
        axios.post('/customers',customer,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('errors')){
                swal.fire(`${response.data.message}`,"","error")
            } else {
                const customer = response.data
                redirect()
                dispatch(addCustomer(customer))
            }
        })
    }
}

export const editCustomer = (customer) => {
    return {
        type: 'EDIT_CUSTOMER',
        payload: customer
    }
}

export const startEditCustomer = (customer,id,redirect) => {
    return(dispatch) => {
        axios.put(`/customers/${id}`,customer,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response.data)
            if (response.data.errors) {
                swal.fire(`${response.data.message}`,"","error")
            } else {
                const customer = response.data
                redirect()
                dispatch(editCustomer(customer))
                //dispatch(updateTicketCustomer(customer))
            }
        })
    }
}