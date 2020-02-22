import React,{ useState }  from 'react'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'


import CustomersList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import CustomerEdit from './components/customers/Edit'

import DepartmentsList from './components/departments/List'
import DepartmentShow from './components/departments/Show'
import DepartmentEdit from './components/departments/Edit'

import EmployeesList from './components/employees/List'
import EmployeeNew from './components/employees/New'
import EmployeeShow from './components/employees/Show'
import EmployeeEdit from './components/employees/Edit'

import TicketsList from './components/tickets/List'
import TicketNew from './components/tickets/New'
import TicketShow from './components/tickets/Show'
import TicketEdit from './components/tickets/Edit'
import Reports from './components/tickets/Reports'

import Home from './components/Home/home'


import Register from './components/user/Register'
import Login from './components/user/Login'

import 'bootstrap/dist/css/bootstrap.min.css'
import {Collapse,Navbar,NavbarBrand,Nav,NavItem,NavbarToggler,UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,} from 'reactstrap'

import {connect} from 'react-redux'
import swal from 'sweetalert2'


import {startRemoveUser} from './actions/user'




function App(props) {
  const [collapsed, setCollapsed] = useState(true)
  const toggleNavbar = () => setCollapsed(!collapsed);


  return (
    <BrowserRouter>
      <>
      <Navbar color="blue" dark expand="md" className="mb-5 bg-primary">
        <NavbarBrand>Ticket Master</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link className="nav-link text-white" to="/">Home</Link>
            </NavItem>
            {Object.keys(props.user).length>0?( 
              <>
                <NavItem>
                  <Link className="nav-link text-white" to="/customers">Customers</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link text-white" to="/departments">Departments</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link text-white" to="/employees">Employees</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-white">
                  Tickets
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/tickets">My Tickets</Link>     
                  </DropdownItem>
                  <DropdownItem>
                  <Link to="/reports">Reports</Link>    
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                <NavItem>
                  <Link className="nav-link text-white" to="/users/logout" onClick={()=>{
                    swal.fire({
                      title:"Are you sure to log out?",
                      icon:'warning',
                      buttons: true,
                      dangerMode: true

                    })
                    .then(confirmLogout =>{
                      if(confirmLogout) {
                        props.dispatch(startRemoveUser())
                        swal.fire("Successfully Logged out",{icon:"success"})
                      }
                    })
                  }}>Logout</Link>
                </NavItem>
              </>
            ):(<>
              <NavItem>
                <Link className="nav-link text-white" to="/users/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link text-white" to="/users/register">Register</Link>
              </NavItem>
              
            </>)
            }
          </Nav>
          </Collapse>
      </Navbar>
      <div className ="container">
      <Switch>
        <Route path="/" component = {Home} exact ={true}/>

        <Route path="/customers" component={CustomersList} exact = {true}/>
        <Route path ="/customers/new" component={CustomerNew}/>
        <Route path="/customers/edit/:id" component={CustomerEdit} />
        <Route path="/customers/:id" component={CustomerShow}/>

        <Route path="/departments" component={DepartmentsList} exact={true}/>
        <Route path="/departments/edit/:id" component={DepartmentEdit}/>
        <Route path="/departments/:id" component={DepartmentShow}/>

        <Route path="/employees" component={EmployeesList} exact={true}/>
        <Route path="/employees/new" component={EmployeeNew}/>
        <Route path="/employees/edit/:id" component={EmployeeEdit}/>
        <Route path="/employees/:id" component={EmployeeShow}/>

        <Route path="/tickets" component={TicketsList} exact={true}/>
        <Route path="/tickets/new" component={TicketNew}/> 
        <Route path="/tickets/edit/:id" component={TicketEdit}/>
        <Route path="/tickets/:id" component={TicketShow}/>
        <Route path="/reports" component={Reports}/>

        <Route path="/users/login" component={Login} exact={true} />
        <Route path="/users/register" component={Register} exact={true}/>
  


      </Switch>
      </div>
      
      </>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
