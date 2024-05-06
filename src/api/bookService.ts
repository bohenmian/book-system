import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export const getBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        console.log(response)
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