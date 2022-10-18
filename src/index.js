import React from 'react';
import ReactDOM from 'react-dom/client';
import "./scss/styles.scss"
import {AuthProvider} from './context/AuthProvider';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from "./context/ThemeProvider";
import Opex from "./Opex";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

//add custom title & meta
const meta = document.getElementsByTagName('meta')
document.title = window.env.REACT_APP_TITLE;
meta.description.content = window.env.REACT_APP_DESCRIPTION_CONTENT

// Create a react-query client
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<Opex/>}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    </ThemeProvider>);