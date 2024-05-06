import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/books`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching books');
    }
};