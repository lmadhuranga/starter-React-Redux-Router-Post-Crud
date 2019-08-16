import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecords, deletePost} from '../../redux/actions/postActions';
import { Link } from 'react-router-dom';
import { moduleConfig } from './config';

class ListPage extends Component { 
  
  constructor() {
    super();
    this.deletePost = this.deletePost.bind(this);
  }

  getPosts() { 
    this.props.fetchRecords();
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
          <button className="btn btn-outline-danger btn-sm" onClick={(e) => this.deletePost(e, post.id)}>x</button>
        </li>
      );
    });

    return (
      <div className="container ListPage">
        <div className="row">
          <h1>Post Collection</h1> &nbsp;
          <Link className="btn btn-outline-info btn-sm" to={`/${moduleConfig.url}/edit`}>New</Link>
        </div>
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
    fetchRecords: () => dispatch(fetchRecords()),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect( mapStateToprops, mapDispatchToProps)(ListPage);