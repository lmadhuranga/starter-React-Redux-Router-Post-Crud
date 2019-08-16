import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecord } from '../../redux/actions/userActions';
import { moduleConfig } from './config';


class ViewPage extends Component {

  constructor(){
    super();
    this.state = { 
      user:{}
    }
  }

  componentDidMount(props){
    let userId = this.props.match.params.id;
    this.props.fetchRecord(userId);    
  }

  componentWillReceiveProps(props){
    this.setState({user:props.user});
  }

  render() {
    const { user } = this.state;
    let editurl = `/${moduleConfig.url}/edit/${user.id}`;
     
    if(user.name===undefined)
      return(<div>Loading...</div>);
      
    return (
      <div className="container user-page">
        <h1>User : {user.name}</h1>
        <p>{user.email}</p>
        <Link className="btn btn-primary btn-sm" to={editurl}>Edit</Link> &nbsp;
        <Link className="btn btn-primary btn-sm" to={`/${moduleConfig.url}`} > Back</Link>
      </div>
    );
    
  }
}

// ViewPage.propTypes = {
//   name: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  user: state.users.item
});

export default connect( mapStateToprops, { fetchRecord })(ViewPage);