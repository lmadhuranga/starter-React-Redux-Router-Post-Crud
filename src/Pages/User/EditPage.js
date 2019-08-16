import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { create, update, fetchUser } from '../../redux/actions/userActions';
import { moduleConfig } from './config'

class EditPage extends Component {

    constructor(props){ 
        super(); 
        this.state = { 
            user: {
                id: 0,
                name:'',
                email:'', 
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
            user : { ...prevState.user, [name]: value }
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
        const userId = this.isUpdate(); 
        let { user } = this.state;
        if(userId){
            e.preventDefault();
            this.props.update(userId, user);
            this.redirect(userId);
        }
        else {
            e.preventDefault();
            this.props.create(user);
            this.redirect();
        }
    }

    componentDidMount(){
        const userId = this.isUpdate();
        console.log('userId',userId);
        if(userId)
            this.props.fetchUser(userId);
    }

    componentWillReceiveProps(props) {
        this.setState({user:props.user});
    }

    render(props) {  
        let { user } = this.state;
        // Check data loaded only update page
        if(user.id===0 && this.isUpdate())
            return(<div>Loading...</div>);
        let headLine = <h1 >Create User</h1>;
        if(this.isUpdate()) {
            headLine = <h1 >Update { user.name } User</h1>;
        }
        return (
            <div className="user-page">
                { headLine }
                <form onSubmit={this.handleSaveData.bind(this)}>
                    <input type="text" ref="name" defaultValue={ user.name } name="name" placeholder="Title" onChange={this.handleInput}/> <br/>
                    <input type="text" ref="email" defaultValue={ user.email } name="email" placeholder="Content" onChange={this.handleInput}/> <br/>                     
                    <button type="submit">Save </button>
                </form>
            </div>
        );
        
    }
}

const mapStateToprops = state => ({
    user: state.users.item
});

export default connect( mapStateToprops, { create, update, fetchUser })(EditPage);