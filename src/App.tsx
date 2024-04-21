import './App.css';
import { HashRouter, Route, Routes} from 'react-router-dom';
import { HomePage } from './Pages/HomePage/HomePage';
import { MembersPage } from './Pages/MembersPage/MembersPage';
import { SignUpPage } from './Pages/SignUpPage/SignUpPage';
import { DetailedPage } from './Pages/DetailedPage/DetailedPage';
import { BasicQuestionsPage } from './Pages/BasicQuestionsPage/BasicQuestionsPage';
import { ReportsPage } from './Pages/ReportsPage/ReportsPage';
import { AppHeader } from './Components/Header/AppHeader';
import { AppFooter } from './Components/Footer/AppFooter';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { UserPage } from './Pages/UserPage/UserPage';
import { useEffect, useState } from 'react';
import { User } from './Interfaces/User';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)


function App() {
  //TODO reimplement current user state in app scope and trickle it down.

  const [user, setUser] = useState<User | null>(null);
  const [signedIn, setSignedIn] = useState<boolean>(false);

  //if any child component signs the user out then this is triggered by embedded callback
  useEffect(() => {
    if (signedIn) {
      const userString = sessionStorage.getItem("CURRENT_USER");
      if (userString !== null) {
        setUser(JSON.parse(userString));
      }
    } else {
      setUser(null)
    }
  }, [signedIn])


  return (
    <HashRouter>
      <div className="App">
        <AppHeader user={user}></AppHeader>
        <div className = "App-content">
            <Routes>
              <Route path = "/home" element = {<HomePage user = {user}/>}> </Route>
              <Route path = "/login" element = {<LoginPage setSignedIn={setSignedIn} />}></Route>
              <Route path = "/sign-up" element = {<SignUpPage setSignedIn={setSignedIn}/>}></Route>
              <Route path = "/short-quiz" element = {<BasicQuestionsPage/>}> </Route>
              <Route path = "/detailed-quiz" element = {<DetailedPage/>}> </Route>
              <Route path = "/report" element = {<ReportsPage/>}> </Route>
              <Route path = "/user-page" element = {<UserPage setSignedIn={setSignedIn}/>}> </Route>
              <Route path = "/" element = {<MembersPage/>}></Route>
            </Routes>
        </div>
        <AppFooter></AppFooter>
      </div>
    </HashRouter>
  );
}

export default App;
