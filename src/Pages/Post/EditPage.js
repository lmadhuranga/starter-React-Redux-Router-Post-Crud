import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { create, update, fetchRecord } from '../../redux/actions/postActions';
import { moduleConfig } from './config'

class EditPage extends Component {

    constructor(props){ 
        super(); 
        this.state = { 
            post: {
                id: 0,
                title:'',
                body:'',
                userId:'',
                completed: false
            }  
        } 
        this.handleInput = this.handleInput.bind(this)
    }

    isUpdate(){
        const { params } = this.props.match; 
        return (params.id !== undefined) ? params.id : false;
    } 
    
    handleInput(event){
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value; 
        this.setState( prevState => ({ 
            post : { ...prevState.post, [name]: value }
        }));
    }

    redirect = (id=false) => { 
        const { history } = this.props;
        if(id) {
            history.push(`/${moduleConfig.url}/view/${id}`);
        }
        else {
            history.push(`/${moduleConfig.url}`);
        }
    }
    
    handleSaveData(e) {
        const postId = this.isUpdate(); 
        let { post } = this.state;
        if(postId){
            e.preventDefault();
            this.props.update(postId, post);
            this.redirect(postId);
        }
        else {
            e.preventDefault();
            this.props.create(post);
            this.redirect();
        }
    }

    componentDidMount(){
        const postId = this.isUpdate();
        console.log('postId',postId);
        if(postId)
            this.props.fetchRecord(postId);
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({post:props.post});
    }

    render(props) {  
        let { post } = this.state;
        // Check data loaded only update page
        if(post.id===0 && this.isUpdate())
            return(<div>Loading...</div>);
        let headLine = <h1 >Create Post</h1>;
        if(this.isUpdate()) {
            headLine = <h1 >Update { post.title } Post</h1>;
        }
        return (
            <div className="container post-page">
                { headLine }
                <form className="" onSubmit={this.handleSaveData.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="title"></label>
                        <input className="form-control" type="text" ref="title" defaultValue={ post.title } name="title" placeholder="Title" onChange={this.handleInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body"></label>
                        <input className="form-control" type="text" ref="body" defaultValue={ post.body } name="body" placeholder="Content" onChange={this.handleInput}/> 
                    </div>
                    <button className="btn btn-primary btn-sm" type="submit">Save </button>
                </form>
            </div>
        );
        
    }
}

const mapStateToprops = state => ({
    post: state.posts.item
});

export default connect( mapStateToprops, { create, update, fetchRecord })(EditPage);