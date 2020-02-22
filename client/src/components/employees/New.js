import React from 'react'
import EmployeeForm from './Form'


import {connect} from 'react-redux'
import {startAddEmployee} from '../../actions/employees'

class EmployeeNew extends React.Component{

    handleSubmit = (employee) => {

            const redirect = () => this.props.history.push('/employees')
            this.props.dispatch(startAddEmployee(employee,redirect))
        }


    render(){
        return (
            <div>
                    <h2>Add Employee</h2>
                    <EmployeeForm handleSubmit = {this.handleSubmit}/>
                
            </div>
        )
    }
}

export default connect()(EmployeeNew)