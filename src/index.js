import React from 'react';
import ReactDOM from 'react-dom/client';
import "./scss/styles.scss"
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from './context/AuthProvider';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from "./context/ThemeProvider";
import Opex from "./Opex";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="*" element={<Opex/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    </ThemeProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
