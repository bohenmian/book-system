import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export interface Book {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    isbn: string;
}

export const createBook = async (data: Omit<Book, 'id'>) => {
    try {
        const response = await axios.post(`${BASE_URL}/books`, data);
        return response.data as number;
    } catch (error) {
        throw new Error('Error creating book');
    }
};

export const getBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching books');
    }
};


export const getBookById = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/books/${id}/book`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching book detail error');
    }
}

export const updateBook = async (id: string, data: Book) => {
    try {
        const response = await axios.put(`${BASE_URL}/books/${id}/book`, data);
        return response.data as Book;
    } catch (error) {
        throw new Error('Error updating book');
    }
};

export const deleteBook = async (id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/books/${id}/book`);
        return response.data as number;
    } catch (error) {
        throw new Error('Error deleting book');
    }
};