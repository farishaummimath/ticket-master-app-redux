import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

import {connect} from 'react-redux'
import {Card, Button, CardText, CardBody, Col, Row,
    CardTitle, Container } from 'reactstrap'



class CustomerShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tickets: []
        }
    }
    
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
           
            this.setState({tickets:response.data.tickets}) 
    
        })
        .catch(err=>{
            console.log(err)
        })
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
    
    render(){
        return(
            <div className="mt-3">
                {this.props.customer && (
                    <Row>
                    <Col md="9">
                         <h3>{this.props.customer.name} - {this.props.customer.email}</h3>
                    </Col> 
                    <Col md= "3">
                        <Link to={`/customers/edit/${this.props.customer._id}`}> <h3>Edit Details</h3> </Link>
                    </Col>
    
                    </Row>
                )}
                <Container>
                    <Row><Col><h6>Customer Tickets-{this.state.tickets.length}</h6></Col></Row>
                    <Row>
                        {
                            this.state.tickets.map(ticket=>{
                                console.log(ticket)
                                return (
                                    <Col md="3"className="mb-1" key={ticket._id}>
                                        <Card>
                                            <CardTitle className="text-center">{ticket.code}</CardTitle>
                                            <CardBody>                              
                                                <CardText>Message : {ticket.message}</CardText>
                                                <CardText> Ticket Status: {ticket.isResolved?<span style={{color:"green"}}>Resolved</span>:<span style={{color:"red"}}>Pending</span>}</CardText>
                                                <Link to={`/tickets/${ticket._id}`}><Button color="primary">View Tickets</Button></Link>
                                            </CardBody>
                                        </Card>
                                    </Col>
        
                                )
        
                            })
                        }

                    </Row>
                    
             
                </Container>
                
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        customer: state.customers.find(customer=> customer._id == id),
        customers : state.customers,
        departments: state.departments,
        employees: state.employees
    }
}

export default connect(mapStateToProps)(CustomerShow)