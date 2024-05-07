import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {BookListing} from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import CreateBook from "./pages/components/CreateBook";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={BookListing}/>
                <Route path="/books/:id/book" Component={BookDetail}/>
            </Routes>
        </Router>
    );
};

export default App;
