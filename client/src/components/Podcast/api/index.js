import axios from "axios";

const baseURL = "http://localhost:3000/";


// Assuming this is your existing code to fetch all podcasts in the frontend
export const getAllSongs = async() => {
    try {
        const response = await axios.get(`${baseURL}api/pod/getAll`);
        return response.data.podcasts; // Ensure to access response.data.podcasts
    } catch (error) {
        console.error('Error fetching all podcasts:', error);
        return null;
    }
};

export const fetchTopPodcards = async() => {
    try {
        const res = await axios.get(`${baseURL}api/pod/top-podcards`);
        return res.data;
    } catch (error) {
        console.error("Error fetching top podcards:", error);
        return [];
    }
};
export const fetchUserPodcards = async(token) => {
    try {
        const res = await axios.get(`${baseURL}api/pod/user-podcasts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching user podcasts:", error);
        return [];
    }
};



export const saveNewSong = async(data) => {
    try {
        const res = axios.post(`${baseURL}api/pod/save`, {...data });
        return (await res).data.podcast;
    } catch (error) {
        console.error("Error in saveNewSong:", error.response);
        return null;
    }
};

export const deleteSongById = async(id) => {
    try {
        const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
        return res;
    } catch (error) {
        return null;
    }
};