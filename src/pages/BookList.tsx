import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Book, deleteBook, getBooks } from '../api/bookService';
import { useNavigate } from 'react-router-dom';
import CreateBook from './components/CreateBook';

export const BookListing: React.FC = () => {
    const navigate = useNavigate();
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

    const onDelete = async (id: string) => {
        await deleteBook(id);
        await fetchBooks();
    };

    return (
        <div>
            <CreateBook onAdded={getBooks} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                            <TableRow
                                key={book.id}
                                onClick={() => navigate(`/books/${book.id}/book`)}
                            >
                                <TableCell component="th" scope="row">
                                    {book.title}
                                </TableCell>
                                <TableCell align="right">{book.author}</TableCell>
                                <TableCell align="right">{book.publicationYear}</TableCell>
                                <TableCell align="right">{book.isbn}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => onDelete(book.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
