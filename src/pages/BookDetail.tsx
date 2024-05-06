import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Book} from "./BookList";
import {getBookById} from "../api/bookService";

const initBook: Book = Object.freeze({
    id: "",
    author: "",
    title: "",
    publicationYear: 0,
    isbn: "",
});

const BookDetail: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [book, setBook] = useState<Book>(initBook);

    useEffect(() => {
       id && getBook(id)
    }, [id]);

    const getBook = async (id: string) => {
        try {
            const book = await getBookById(id);
            setBook(book);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    return (
        <div>
            <h3>Title: {book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Publication Year: {book.publicationYear}</p>
            <p>ISBN: {book.isbn}</p>
        </div>
    );
};

export default BookDetail;
