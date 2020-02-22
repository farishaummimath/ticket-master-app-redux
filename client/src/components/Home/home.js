import React from 'react'
import {Link} from 'react-router-dom'
import {Jumbotron, Container, Row, Col,Button} from 'reactstrap'
import img from './landingImage.png'
import Register from '../user/Register'
import {connect} from 'react-redux'


function Home(props){
        return (
           <>
           {Object.keys(props.user).length==0?(
                <Container>
                <Row>
                    <Col md="6">
                        <h2 className="mb-5">Welcome To The Ticket Master App</h2>
                        <img src={img} alt="+"/>
                    </Col>
                    <Col md="6">
                        <Register {...props}/>
                        Already have an account? <Link className="nav-link text-primary" to="/users/login">Login here</Link>
                    </Col>
                </Row>
            </Container>
           ):(
            <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Ticket Master App</h1>
              <p className="lead">This is a ticket master application where you can manage your customer, employee and ticket data and keep a track of all tickets.</p>
              <Link className="nav-link text-primary" to="/customers"><Button color="primary">Get Started</Button>{' '}</Link>

            </Container>
          </Jumbotron>
           )
}
            
            </>
        )
}
    
const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
export default connect(mapStateToProps)(Home)