import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, deletePost} from '../../redux/actions/postActions';
import { Link } from 'react-router-dom';
import { appConfig } from '../../config/globel.conf';

import PostListPage from '../Post/ListPage';
import UserListPage from '../User/ListPage';


class HomePage extends Component { 
  
  constructor() {
    super();
  }

  componentDidMount() {
  }
  
  render() {
    
    return (
      <div className="HomePage">
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
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect( mapStateToprops, mapDispatchToProps)(HomePage);