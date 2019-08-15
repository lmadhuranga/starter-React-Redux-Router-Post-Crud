import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
 
import ViewPage from './Pages/ViewPage';
import EditPostPage from './Pages/EditPostPage';
import ListPage from './Pages/ListPage';
import Navgation from './Pages/Navgation';
import Error from './Pages/Error';

class App extends Component {
 
  render() {
    
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navgation/>
            <Switch> 
              <Route path='/' exact component={ListPage} />
              <Route path='/view/:id' component={ViewPage} />
              <Route path='/edit/:id' component={EditPostPage} />
              <Route path='/edit' component={EditPostPage} />
              <Route  component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
 
export default App;