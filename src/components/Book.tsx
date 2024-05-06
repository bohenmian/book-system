import React from 'react';

export interface Book {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    isbn: string;
}

export interface BookProps {
    book: Book
}

const BookDetail: React.FC<BookProps> = ({ book }) => {
    return (
        <div>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Publication Year: {book.publicationYear}</p>
            <p>ISBN: {book.isbn}</p>
        </div>
    );
};

export default BookDetail;
