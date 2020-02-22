import React from 'react'
import EmployeeForm from './Form'


import {connect} from 'react-redux'
import { startEditEmployee } from '../../actions/employees'

class EmployeeEdit extends React.Component{


    handleSubmit = (employee) => {
        const id = this.props.match.params.id

        const redirect = () => this.props.history.push(`/employees/${employee.id}`)
        this.props.dispatch(startEditEmployee(employee,redirect))
    }

    render(){
        return (
            <div>
            {this.props.employee && (
                <div>
                    <h2>Edit Employee</h2>
            
                    {this.props.employee.name &&  <EmployeeForm employee = {this.props.employee} handleSubmit = {this.handleSubmit}/>}
                </div>
            )}
             
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        employee: state.employees.find(employee=> employee._id == id)
    }
}

export default connect(mapStateToProps)(EmployeeEdit)