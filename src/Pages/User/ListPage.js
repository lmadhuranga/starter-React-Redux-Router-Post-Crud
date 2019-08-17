import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecords, deleteUser} from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { moduleConfig } from './config';

class ListPage extends Component { 
  
  constructor() {
    super();
    this.deleteUser = this.deleteUser.bind(this);
  }

  getUsers() { 
    this.props.fetchRecords();
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
    const { users, limit } = this.props;
    const recordsCount = users.length;

    if(recordsCount===0){
      return(<div>Loading.....</div>);
    }
    // if list defined only list last items only
    const _limit = limit || recordsCount; 
    
    let usersItems = users.slice((recordsCount - _limit), recordsCount).map((user)=>{
      let url = `/${moduleConfig.url}/view/${user.id}`;
      return (
        <li key={user.id}>
          <Link to={url} > {user.name} </Link>
          <button className="btn btn-outline-danger btn-sm" onClick={(e) => this.deleteUser(e, user.id)}>x</button>
        </li>
      );
    });

    return (
      <div className="container ListPage">
        <div className="row">
          <h1>User Collection</h1>
          <Link className="btn btn-outline-info btn-sm" to={`/${moduleConfig.url}/edit`}>New</Link>
        </div>
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
    fetchRecords: () => dispatch(fetchRecords()),
    deleteUser: (id) => dispatch(deleteUser(id))
  }
}

export default connect( mapStateToprops, mapDispatchToProps)(ListPage);