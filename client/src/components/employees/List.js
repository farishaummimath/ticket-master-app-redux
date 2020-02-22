import React from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'

import { Table,Button } from 'reactstrap'

import swal from 'sweetalert2'

import {startRemoveEmployee} from '../../actions/employees'


class EmployeesList extends React.Component {

    handleRemove = (id) => {
        swal.fire({
            title: "Are you sure you want to Delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((confirmRemove) => {
            if (confirmRemove) {
              swal("Successfully Deleted", {
                icon: "success",
              });
              this.props.dispatch(startRemoveEmployee(id))
            } 
          })
    }

    findDepartment(id) {
         return this.props.departments.find(dept => dept._id == id)
    }
       

    
    render(){
        return(
            <div>
                    <h2>Employees - {this.props.employees.length}</h2>
                    <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Actions</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                                {this.props.employees.map((employee,index) => {
                                    return (
                                        <tr key={employee._id}>
                                        <td>{index+1}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobile}</td>
                                        <td>{employee.department.name ? employee.department.name : this.findDepartment(employee.department).name}</td>
                                        <td><Link to={`/employees/${employee._id}`}><Button color="info">show</Button></Link></td>
                                        <td><Button color="danger" onClick = {()=>{
                                             this.handleRemove(employee._id)
                                        }}>Remove</Button></td>
                                    </tr>
                                    )   
                                                       
                                })}

                   </tbody>

                   </Table>
                    <Link to="/employees/new" className="btn btn-primary">Add Employee</Link>      
            </div>
            )
        }
    }   

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        departments: state.departments
    }
}

export default connect(mapStateToProps)(EmployeesList)