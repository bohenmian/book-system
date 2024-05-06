import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getBooks} from "../api/bookService";
import {useNavigate} from "react-router-dom";

export interface Book {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    isbn: string;
}

export const BookListing: React.FC = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const gotoDetailPage = (id: string) => {
        navigate(`/books/${id}/book`)
    }

    return (
        <div>
            <h2>Book Listing</h2>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Publication Year</TableCell>
                            <TableCell align="right">ISBN</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book: Book) => (
                            <TableRow key={book.id} onClick={() => gotoDetailPage(book.id)}>
                                <TableCell component="th" scope="row">{book.title}</TableCell>
                                <TableCell align="right">{book.author}</TableCell>
                                <TableCell align="right">{book.publicationYear}</TableCell>
                                <TableCell align="right">{book.isbn}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
