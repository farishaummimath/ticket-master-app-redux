import React from 'react'
import {Link} from 'react-router-dom'

import TicketTab from './Tab'

import { Container, Row, Col } from 'reactstrap'

import swal from 'sweetalert2'
import {Progress} from 'reactstrap'

import {connect}  from 'react-redux'
import {startToggleResolve} from '../../actions/tickets'
import {startRemoveTicket} from '../../actions/tickets'


class TicketsList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search:'',
            currentTickets: this.props.tickets
        }
    }

    findDepartment = (id) => {
        return this.props.departments.find(dept => dept._id == id)
    }

    handleRemove = (id) => {
        swal.fire({
            title: "Are you sure you want to Delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((confirmRemove) => {
            if (confirmRemove) {
              swal.fire("Successfully Deleted", {
                icon: "success",
              });
              this.props.dispatch(startRemoveTicket(id))
              this.setState(prevState=>({
                currentTickets: prevState.currentTickets.filter(ticket=>ticket._id != id)
            }))
                } 
             })
    }

    handleResolve = (id) =>{
        const ticket = this.props.tickets.find(ticket=>ticket._id == id)
        const isResolved = ticket.isResolved

        this.props.dispatch(startToggleResolve(id,isResolved))
    }

    handleSearch = (e) => {

        let newTickets = this.props.tickets.filter(ticket=>ticket.code.includes(e.target.value))
        this.setState({
            search: e.target.value,
            currentTickets: newTickets
        })
    }

    

    calculatePercentage(){
        const allTickets = this.props.tickets.length
        const completedTickets = this.props.tickets.filter(ticket=>ticket.isResolved).length
        const percent = Math.round((completedTickets/allTickets)*100)
        return percent
    }

    render(){
        

        return (
            <Container>
                <Row>
                    <Col>
                        <form className="form-inline float-left mt-3" onSubmit={this.handleSubmit}>
                            <input className="form-control mr-sm-2" type="search"  placeholder="Search Code" aria-label="Search" onChange={this.handleSearch}/>
                        </form>
                    </Col>
                    <Col>
                    <div className="text-center">Completed Tickets: {this.calculatePercentage()}%</div>
                    <Progress className="mb-5" striped value={`${this.calculatePercentage()}`}/>
                    </Col>
                    
                </Row>
                <Row>
                <Col>
                
                    <TicketTab tickets= {this.state.currentTickets.length == 0? this.props.tickets : this.state.currentTickets} handleResolve={this.handleResolve} handleRemove={this.handleRemove}/>
        
                    <Link to ="/tickets/new" className="mb-4 mt btn btn-primary">Add Ticket</Link>
                 </Col>
                
                    
              
             </Row>
            </Container>
        )
        
    }
}

const mapsStateToProps = (state) => {
    return {
        tickets: state.tickets,
        departments: state.departments
    }
}

export default connect(mapsStateToProps)(TicketsList)