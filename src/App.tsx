import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {BookListing} from "./pages/BookList";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={BookListing}/>
            </Routes>
        </Router>
    );
};

export default App;
