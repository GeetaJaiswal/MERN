import Home from './components/Home/Home';
import Navbar  from './components/Navbar';
import {Box} from '@material-ui/core';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DetailView from './components/post/DetailView';
import CreateView from './components/post/CreateView';
import UpdateView from './components/post/UpdateView';
import Login from './components/Form/Login';
import Register from './components/Form/Register';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/> 
      <Box style={{marginTop:64}}> 
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Register} />
          <Route exact path='/details/:id' component={DetailView} />
          <Route exact path='/create' component={CreateView} />
          <Route exact path='/update/:id' component={UpdateView} />
        </Switch> 
      </Box>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
