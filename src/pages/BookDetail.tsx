import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book, getBookById } from '../api/bookService';


const BookDetail: React.FC = () => {
    const [book, setBook] = useState<Book>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
       id && getBook(id)
    }, [id]);

    const getBook = async (id: string) => {
        try {
            const response = await getBookById(id);
            setBook(response);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    return (
        <div>
            <h3>Title: {book?.title}</h3>
            <p>Author: {book?.author}</p>
            <p>Publication Year: {book?.publicationYear}</p>
            <p>ISBN: {book?.isbn}</p>
        </div>
    );
};

export default BookDetail;
