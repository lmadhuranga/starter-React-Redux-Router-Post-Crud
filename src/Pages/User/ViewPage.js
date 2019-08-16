import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../redux/actions/userActions';
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
    this.props.fetchUser(userId);    
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
      <div className="user-page">
        <h1>User : {user.name} <Link to={editurl}>Edit</Link> <Link to={`/${moduleConfig.url}`}>Back</Link></h1>
        <p>{user.email}</p>
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

export default connect( mapStateToprops, { fetchUser })(ViewPage);