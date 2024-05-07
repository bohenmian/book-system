import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fragment, useState} from 'react';
import {Book, updateBook} from '../../api/bookService';
import {Box, TextField} from '@mui/material';
import dayjs, {Dayjs} from 'dayjs';
import {DatePicker} from '@mui/x-date-pickers';

export default function EditBook(props: { book: Book; onEdited: (isConfirmed: boolean) => void; }) {
    const {book, onEdited} = props;
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [year, setYear] = useState<Dayjs | null>(() => {
        const date = dayjs();
        date.set('year', book.publicationYear);
        return date;
    });
    const [isbn, setIsbn] = useState(book.isbn);

    const handleConfirm = async () => {
        if (title && author && year && isbn) {
            await updateBook(book.id, {
                id: book.id,
                title,
                author,
                publicationYear: year.year(),
                isbn,
            });
            onEdited(true);
        }
    };

    return (
        <Fragment>
            <Dialog
                open
                onClose={() => onEdited(false)}
                aria-labelledby="Edit Book"
                fullWidth
            >
                <DialogTitle>Edit Book</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please fill in the details of the book.
                    </DialogContentText>
                    <Box sx={{py: 2}}>
                        <TextField
                            error={title === ''}
                            label="Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{py: 2}}>
                        <TextField
                            error={author === ''}
                            label="Author"
                            variant="outlined"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{py: 2}}>
                        <DatePicker
                            views={['year']}
                            label="Year only"
                            value={year}
                            onChange={setYear}
                            sx={{width: "100%"}}
                        />
                    </Box>
                    <Box sx={{py: 2}}>
                        <TextField
                            error={isbn === ''}
                            label="ISBN"
                            variant="outlined"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => onEdited(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
