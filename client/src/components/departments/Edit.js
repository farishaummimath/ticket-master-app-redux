import React from 'react'

import {connect} from 'react-redux'

import DepartmentForm from './Form'
import { startEditDepartment } from '../../actions/departments'


class DepartmentEdit extends React.Component{
    
    handleSubmit = (department) => {
        const id = this.props.match.params.id
        const redirect = () => this.props.history.push(`/departments/${id}`)
        this.props.dispatch(startEditDepartment(department,id,redirect))
    }


    render(){
        return (
            <div>
                {this.props.department && (
                    <div>
                         <h2>Edit Department</h2>
                         {this.props.department.name && <DepartmentForm department = {this.props.department} handleSubmit = {this.handleSubmit} />}
                    </div>
                )}
               
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        department: state.departments.find(department => department._id == id)
    }
}

export default connect(mapStateToProps)(DepartmentEdit)
