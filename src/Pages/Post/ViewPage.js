import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../../redux/actions/postActions';
import { moduleConfig } from './config';


class ViewPage extends Component {

  constructor(){
    super();
    this.state = { 
      post:{}
    }
  }

  componentDidMount(props){
    let postId = this.props.match.params.id;
    this.props.fetchPost(postId);    
  }

  componentWillReceiveProps(props){
    this.setState({post:props.post});
  }

  render() {
    const { post } = this.state;
    let editurl = `/${moduleConfig.url}/edit/${post.id}`;
     
    if(post.title===undefined)
      return(<div>Loading...</div>);
      
    return (
      <div className="post-page">
        <h1>Post : {post.title} <Link to={editurl}>Edit</Link> <Link to={`/${moduleConfig.url}`}>Back</Link></h1>
        <p>{post.body}</p>
      </div>
    );
    
  }
}

// ViewPage.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  post: state.posts.item
});

export default connect( mapStateToprops, { fetchPost })(ViewPage);