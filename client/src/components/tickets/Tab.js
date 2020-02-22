import React from 'react'
import {Link} from 'react-router-dom'
import { TabContent, Button,TabPane, Nav, NavItem, NavLink,Table} from 'reactstrap'
import classnames from 'classnames'

import {connect} from 'react-redux'


class TicketTab extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeTab: '1'
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
        }
    }

    findCustomer =  (id) => {
        return this.props.customers.find(customer => customer._id == id )
    }

    findDepartment = (id) => {
        return this.props.departments.find(department => department._id == id)
    }

    findEmployees = (id) => {
        return this.props.employees.find(employee => employee._id == id)
    }

    render() {
        const {tickets} = this.props
        return (
            <div>
            <Nav tabs className="mb-3">
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}>
                    <div style={{cursor: "pointer"}}>Pending</div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}>
                     <div style={{cursor: "pointer"}}>Completed</div>
                  </NavLink>
                </NavItem>

                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    { this.state.activeTab == 1 ? 
                        <div>
                        <h2>Tickets - {tickets.filter(ticket=>!ticket.isResolved).length}</h2>
                    <Table striped>
                    <thead>
                        <tr>
                            <th>Code No</th>
                            <th>Customer</th>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Message</th>
                            <th>Priority</th>
                            <th>Actions</th>
                            <th>Remove</th>
                            <th>Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket)=>{
                            return (
                                !ticket.isResolved &&
                                    <tr key={ticket._id}>
                                        <td>{ticket.code}</td>
                                        <td>{ticket.customer.name? ticket.customer.name : this.findCustomer(ticket.customer).name} </td>
                                        <td>{ticket.department.name? ticket.department.name: this.findDepartment(ticket.department).name} </td>
                                        <td>{ticket.employees[0].name ? ticket.employees.map((emp,index)=>(index===ticket.employees.length-1)?`${emp.name}`: `${emp.name}, `): ticket.employees.map((emp,index)=>(index===ticket.employees.length-1)?`${this.findEmployees(emp).name}`: `${this.findEmployees(emp).name}, `)}</td>
                                        <td>{ticket.message} </td>
                                        <td>{ticket.priority}</td>
                                        <td><Link to={`/tickets/${ticket._id}`}><Button color="info">show</Button></Link></td>
                                        <td><Button color="danger" onClick = {()=>{
                                             this.props.handleRemove(ticket._id)
                                        }}>remove</Button></td>
                                        <td><input type="checkbox" onClick= {()=> {
                                            this.props.handleResolve(ticket._id)
                                        }}/></td>
                                    </tr>
                            )
                                    
                        })}
                    </tbody>
                </Table>
                </div>
                    : null }
                  </TabPane>
                  <TabPane tabId="2">
                    { this.state.activeTab == 2 ? 
                        <div>
                        <h2>Tickets - {tickets.filter(ticket=>ticket.isResolved).length}</h2>
                    <Table striped>
                    <thead>
                        <tr>
                            <th>Code No</th>
                            <th>Customer</th>
                            <th>Department</th>
                            <th>Employees</th>
                            <th>Message</th>
                            <th>Priority</th>
                            <th>Actions</th>
                            <th>Remove</th>
                            <th>Not Complete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket)=>{
                            return (
                                ticket.isResolved &&
                                <tr key ={ticket._id}>
                                    <td>{ticket.code}</td>
                                    <td>{ticket.customer.name? ticket.customer.name : this.findCustomer(ticket.customer).name} </td>
                                    <td>{ticket.department.name? ticket.department.name : this.findCustomer(ticket.department).name} </td>
                                    <td>{ticket.employees[0].name ? ticket.employees.map((emp,index)=>(index===ticket.employees.length-1)?`${emp.name}`: `${emp.name}, `): ticket.employees.map((emp,index)=>(index===ticket.employees.length-1)?`${this.findEmployees(emp).name}`: `${this.findEmployees(emp).name}, `)}</td>
                                    <td>{ticket.message}</td>
                                    <td>{ticket.priority}</td>
                                    <td><Link to={`/tickets/${ticket._id}`}><Button color="info">show</Button></Link></td>
                                    <td><Button color="danger" onClick = {()=>{
                                        this.props.handleRemove(ticket._id)
                                    }}>Remove</Button></td>
                                    <td><input type="checkbox" onClick= {()=> {
                                        this.props.handleResolve(ticket._id)
                                    }}/></td>
                                </tr>
                            )
                                   
                        })}
                    </tbody>
                </Table>
                </div>
                    : null }
                  </TabPane>
                </TabContent>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers : state.customers,
        departments: state.departments,
        employees: state.employees
    }
    
}

export default connect(mapStateToProps)(TicketTab)