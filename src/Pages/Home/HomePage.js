import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecords, deletePost} from '../../redux/post/actions'; 
// import { appConfig } from '../../config/globel.conf';

import PostListPage from '../Post/ListPage';
import UserListPage from '../User/ListPage';


class HomePage extends Component { 
  
  // constructor() {
  //   super();
  // }

  // componentDidMount() {
  // }
  
  render() {
    
    return (
      <div className="container homePage">
        <h1>Home Page</h1>
        <UserListPage ></UserListPage>
        <PostListPage limit={10}></PostListPage>
      </div>
    );
  }
}

// ListPage.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  posts: state.posts.items
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecords: () => dispatch(fetchRecords()),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect( mapStateToprops, mapDispatchToProps)(HomePage);