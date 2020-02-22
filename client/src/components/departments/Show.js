import React from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'


class DepartmentShow extends React.Component{
    constructor(){
        super()
        this.state = {
            tickets: []
        }
    }

    render(){
        return (
            <div>
                {this.props.department && (
                    <div>
                     <h2>Name - {this.props.department.name}</h2>
                     <Link to={`/departments/edit/${this.props.department._id}`}>Edit</Link>
                     
                    
                    </div>
                )}
                
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    const id = props.match.params.id
    return {
        department: state.departments.find(department=>department._id == id)
    }
}

export default connect(mapStateToProps)(DepartmentShow)