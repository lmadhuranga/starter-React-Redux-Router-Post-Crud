import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser} from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { moduleConfig } from './config';

class ListPage extends Component { 
  
  constructor() {
    super();
    this.deleteUser = this.deleteUser.bind(this);
  }

  getUsers() { 
    this.props.fetchUsers();
  }

  deleteUser(e, id) {
    this.props.deleteUser(id)
    .then(()=> {
      this.getUsers();
    })
  }

  componentDidMount() {
    this.getUsers();
  }
  
  render() {
    const { users } = this.props;

    if(users.length===0){
      return(<div>Loading.....</div>);
    }

    let usersItems = users.map((user)=>{
      let url = `/${moduleConfig.url}/view/${user.id}`;
      return (
        <li key={user.id}>
          <Link to={url} > {user.name} </Link>
          <button className="btn btn-small btn-danger" onClick={(e) => this.deleteUser(e, user.id)}>x</button>
        </li>
      );
    });

    return (
      <div className="ListPage">
        <h1>User Collection</h1>
        <ul>
          {usersItems}
        </ul>
      </div>
    );
  }
}

// ListPage.propTypes = {
//   name: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  users: state.users.items
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: (id) => dispatch(deleteUser(id))
  }
}

export default connect( mapStateToprops, mapDispatchToProps)(ListPage);