import React from 'react';

import "./AppFooter.css"



export function AppFooter() : React.JSX.Element {
    return (
        <div className="App-footer">
          <footer>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#/home">Home</a></li>
              <li className="list-inline-item"><a href="#/about">About</a></li>
              <li className="list-inline-item"><a href="mailto:careerbearteam@gmail.com">Report Bugs</a></li>
            </ul>
            <p className = "disclaimer">
                While it is tempting, do not share any personal information with CareerBear!
            </p>
            <p className="copyright">CareerBear © 2024</p> 

          </footer>
        </div>
      );
    };