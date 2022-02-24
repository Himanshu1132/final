import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './utils/routes';
import {useSelector} from 'react-redux'
import { useEffect, useLayoutEffect, useState } from 'react';
import ReactNotification  from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {

  const accountDetails = useSelector(state => state.accountDetails);
  const [acDetails, setacDetails] = useState("");
  
  useEffect(() => {
    setacDetails(accountDetails);
  }, [accountDetails])
  
  const headerRoute = () =>{
    const mainRoute = ["/","/stlogin","/stsignup"];
    let location = window.location.pathname;
    
    if(mainRoute.includes(location)){
      return <Header acDetails={acDetails} />
    }
    else if(acDetails && acDetails.key && acDetails.is_teacher){
      return null
    }
    else if(acDetails && acDetails.key && !acDetails.is_teacher){
      return null
    }
  }

  return (
    <div className="App">
      <ReactNotification isMobile='true'/>
        <Router>
            {
              headerRoute()
            } 
            <Switch>
              {
                routes.map((route,index) => <Route path={route.path} key={index} exact={route.exact} component={route.components} />)
              }
            </Switch>
        </Router>
    </div>
  );
}

export default App;
