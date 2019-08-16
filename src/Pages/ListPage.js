import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../redux/actions/postActions';
import { Link } from 'react-router-dom';

class ListPage extends Component { 
  
  componentDidMount() {
    this.props.fetchPosts();
  }
  
  render() {
    const { posts } = this.props;

    if(posts.length===0){
      return(<div>Loading.....</div>);
    }

    let postsItems = posts.map((post)=>{
      let url = `/view/${post.id}`;
      return <li key={post.id}> <Link to={url} > {post.title} </Link> </li>
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

export default connect( mapStateToprops, { fetchPosts })(ListPage);