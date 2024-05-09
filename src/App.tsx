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
import { DataSetOne } from './Pages/ReportsPage/TestingData/TestingData';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null && prevKey !== "") {
  keyData = JSON.parse(prevKey);
}

sessionStorage.setItem("DETAILED_QUIZ_DATA", JSON.stringify(DataSetOne))

function App() {
  //TODO reimplement current user state in app scope and trickle it down.

  //throwing errors in deployment but will be used in future applications
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, setKey] = useState<string>(keyData); 
  const [user, setUser] = useState<User | null>(null);

  //for api key input
  //sets the local storage item to the api key the user inputed
  const handleSubmit = (newKey : string) => {
    localStorage.setItem(saveKeyData, JSON.stringify(newKey));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  // //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  // const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setKey(event.target.value);
  // }

  const clearKey = () => {
    localStorage.setItem("MYKEY", "");
    console.log("Key has been cleared");
  }

  //if any child component signs the user out then this is triggered by embedded callback
  useEffect(() => {
      const userString = sessionStorage.getItem("CURRENT_USER");
      if (userString !== null) {
        setUser(JSON.parse(userString));
      }
    }, []);

  return (
    <HashRouter>
      <div 
      className="App">
        <AppHeader user={user}></AppHeader>
        <div className = "App-content">
            <Routes>
              <Route path = "/home" element = {<HomePage user = {user} handleKeySubmit={handleSubmit} handleKeyClear={clearKey}/>}> </Route>
              <Route path = "/login" element = {<LoginPage setUser={setUser}/>}></Route>
              <Route path = "/sign-up" element = {<SignUpPage setUser = {setUser}/>}></Route>
              <Route path = "/short-quiz" element = {<BasicQuestionsPage/>}> </Route>
              <Route path = "/detailed-quiz" element = {<DetailedPage user = {user}/>}> </Route>
              <Route path = "/reports" element = {<ReportsPage/>}> </Route>
              <Route path = "/user-page" element = {<UserPage setUser = {setUser}/>}> </Route>
              <Route path = "/" element = {<MembersPage/>}></Route>
            </Routes>
        </div>
        <AppFooter></AppFooter>
      </div>
    </HashRouter>
  );
}

export default App;
