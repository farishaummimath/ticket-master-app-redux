import React from 'react'
import {Link} from 'react-router-dom'

import { Container, Row, Col } from 'reactstrap'

import Chart from 'react-google-charts'

import {connect}  from 'react-redux'

function Reports(props){

    const pendingTickets = props.tickets.filter(ticket=>!ticket.isResolved)
        const pendingHighTickets = pendingTickets.filter(ticket=>ticket.priority == 'high').length
        const pendingMediumTickets = pendingTickets.filter(ticket=>ticket.priority == 'medium').length
        const pendingLowTickets = pendingTickets.filter(ticket=>ticket.priority == 'low').length
        const piedata = [
            ["Priority", "Tickets per Category"],
            ["High", pendingHighTickets],
            ["Medium",pendingMediumTickets],
            ["Low", pendingLowTickets]
          ]
        const options = {
            title: "Ticket Priority",
            is3D: true
          }

        const chartdata = []
        const Header = ["Departments", "Tickets", { role: "style" }]
        chartdata.push(Header)
            props.departments.map(dept=>{
                    const temp = []
                    temp.push(`${dept.name}`)
                    temp.push(pendingTickets.filter(ticket=>(ticket.department.name? ticket.department.name : this.findDepartment(ticket.department).name) == dept.name).length)
                    temp.push("blue")
                    chartdata.push(temp)
            }) 
    return (
        <Container>
            <h3 className="d-flex justify-content-center mb-3">Data on Pending Tickets</h3>
            <Row>

                <Col md="6">
                    
                <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={piedata}
                options={options}
                />
                </Col>

                <Col md="6">
                <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={chartdata}
                options={{
                    chart: {
                        title: 'Tickets By Department',
                    }
                }}
                />
                </Col> 
            </Row>

        </Container>
        
    )
}
const mapsStateToProps = (state) => {
    return {
        tickets: state.tickets,
        departments: state.departments
    }
}

export default connect(mapsStateToProps)(Reports)