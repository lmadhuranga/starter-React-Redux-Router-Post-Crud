import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, deletePost} from '../../redux/actions/postActions';
import { Link } from 'react-router-dom';
import { moduleConfig } from './config';

class ListPage extends Component { 
  
  constructor() {
    super();
    this.deletePost = this.deletePost.bind(this);
  }

  getPosts() { 
    this.props.fetchPosts();
  }

  deletePost(e, id) {
    this.props.deletePost(id)
    .then(()=> {
      this.getPosts();
    })
  }

  componentDidMount() {
    this.getPosts();
  }
  
  render() {
    const { posts, limit } = this.props;
    const recordsCount = posts.length; 
    
    if(recordsCount===0){
      return(<div>Loading.....</div>);
    } 

    // if list defined only list last items only
    const _limit = limit || recordsCount; 
    
    let postsItems = posts.slice((recordsCount - _limit), recordsCount).map((post)=>{
      let url = `/${moduleConfig.url}/view/${post.id}`;
      return (
        <li key={post.id}>
          <Link to={url} > {post.title} </Link>
          <button className="btn btn-small btn-danger" onClick={(e) => this.deletePost(e, post.id)}>x</button>
        </li>
      );
    });

    return (
      <div className="ListPage">
        <h1>Post Collection</h1>
        <ul>
          {postsItems}
        </ul>
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

export default connect( mapStateToprops, mapDispatchToProps)(ListPage);