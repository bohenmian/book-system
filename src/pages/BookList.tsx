import {
    Button, ButtonGroup,
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
import EditBook from './components/EditBook';

export const BookListing: React.FC = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [editBook, setEditBook] = useState<Book | null>(null);

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

    const onEdited = async (isConfirmed: boolean) => {
        isConfirmed && await fetchBooks();
        setEditBook(null);
    }

    return (
        <div>
            <CreateBook onAdded={fetchBooks}/>
            {
                editBook && <EditBook book={editBook} onEdited={onEdited}/>
            }

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Publication Year</TableCell>
                            <TableCell align="right">ISBN</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book: Book) => (
                            <TableRow key={book.id}>
                                <TableCell component="th" scope="row">
                                    {book.title}
                                </TableCell>
                                <TableCell align="right">{book.author}</TableCell>
                                <TableCell align="right">{book.publicationYear}</TableCell>
                                <TableCell align="right">{book.isbn}</TableCell>
                                <TableCell align="right">
                                    <ButtonGroup variant="outlined" size="small">
                                        <Button onClick={() => navigate(`/books/${book.id}/book`)}>View Detail</Button>
                                        <Button onClick={() => setEditBook(book)}>Edit</Button>
                                        <Button onClick={() => onDelete(book.id)}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
