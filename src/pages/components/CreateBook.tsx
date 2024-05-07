import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Fragment, useState } from 'react';
import { createBook } from '../../api/bookService';

export default function CreateBook(props: {onAdded: () => void;}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState<Dayjs | null>(dayjs());
    const [isbn, setIsbn] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = async () => {
        if (title && author && year && isbn) {
            await createBook({
                title,
                author,
                publicationYear: year.year(),
                isbn,
            });
            setOpen(false);
            setTitle('');
            setAuthor('');
            setYear(dayjs());
            setIsbn('');
            props.onAdded();
        }
    };

    return (
        <Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create New Book
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="Create New Book"
            >
                <DialogTitle>Create New Book</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please fill in the details of the new book.
                    </DialogContentText>
                    <TextField
                        error={title === ''}
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        helperText="Title is required."
                    />
                    <TextField
                        error={author === ''}
                        label="Author"
                        variant="outlined"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        helperText="Author is required."
                    />
                    <DatePicker
                        views={['year']}
                        label="Year only"
                        value={year}
                        onChange={setYear}
                    />
                    <TextField
                        error={isbn === ''}
                        label="ISBN"
                        variant="outlined"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        helperText="ISBN is required."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
