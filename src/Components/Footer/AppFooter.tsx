import { useState } from "react";
import {Form } from "react-bootstrap";
import "./AppFooter.css"


let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null && prevKey !== "") {
  keyData = JSON.parse(prevKey);
}

export function AppFooter() : React.JSX.Element {
    const [key, setKey] = useState<string>(keyData); //for api key input
    //sets the local storage item to the api key the user inputed
    function handleSubmit() {
      localStorage.setItem(saveKeyData, JSON.stringify(key));
      window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }
  
    //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
      setKey(event.target.value);
    }

    function clearKey() {
      localStorage.setItem("MYKEY", "");
      console.log("Key has been cleared");
    }

    return (
        <footer className = "App-footer"> 
          <Form>
            <Form.Label>API Key:</Form.Label>
            <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
            <br></br>
            <button className="" onClick={handleSubmit}>Submit</button>
            <button className="" onClick={clearKey}> Clear Key </button>
          </Form>
        </footer>
    )
}