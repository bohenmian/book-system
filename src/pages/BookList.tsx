import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getBooks} from "../api/bookService";
import BookDetail, {BookProps, Book} from "../components/Book";

export const BookListing: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([{
        // TODO mock data
        id: '1',
        isbn: 'isbn text',
        title: 'title text',
        publicationYear: 2023,
        author: 'au..'
    }]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    return (
        <div>
            <h2>Book Listing</h2>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((row) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.author}</TableCell>
                                <TableCell align="right">{row.isbn}</TableCell>
                                <TableCell align="right">{row.publicationYear}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
