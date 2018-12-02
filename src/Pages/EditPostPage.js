import React, { Component } from 'react';
import { appConfig } from '../config/globel.conf';
import { Redirect } from 'react-router-dom';

const hostUrl = appConfig.company.host.url;
const axios = require('axios');

class EditPostPage extends Component {

    constructor(){
        super(); 
        this.state = { 
            post: {
                title:'',
                completed: false
            },
            redirectToReferrer: false
        }

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(event){
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value; 
        this.setState( prevState => ({ 
            post : { ...prevState.post, [name]: value }
        }));
    }

    handleSaveData(e) {
        e.preventDefault();
        axios.put(`${hostUrl}/${this.state.post.id}`, 
            this.state.post
        )
        .then((result) => {
                this.setState({ redirectToReferrer: true });
            } 
        )
    }

    getPost(postId) { 
        axios.get(`${hostUrl}/${postId}`)
        .then(
          (result) => {
              this.setState({post : result.data});
          },          
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        ) 
    }

    componentDidMount(){
        let postId = this.props.match.params.id;
        this.getPost(postId)
    }

    render(props) { 
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div className="post-page">
                <h1>Update {this.state.post.title} Post</h1>
                <form onSubmit={this.handleSaveData.bind(this)}>
                    <input type="text" ref="title" value={this.state.post.title} name="title" placeholder="Title" onChange={this.handleInput}/> <br/>
                    <textarea cols='60' ref="body" value={this.state.post.body} name="body" placeholder="Content" onChange={this.handleInput}/> <br/>                     
                    <button type="submit">Save </button>
                </form>
            </div>
        );
        
    }
}
export default EditPostPage;