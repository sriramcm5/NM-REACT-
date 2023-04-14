import axios from "axios";

export const getJobList = (params) => {
    return axios.get(`https://www.themuse.com/api/public/jobs?${params}&api_key=f23aa0ac7ddd9df5ec3fb2e17caedcce3e24a058dda9850e152b0b5c5bf543f5`);
}

export const getJobById = (id) => {
    return axios.get(`https://www.themuse.com/api/public/jobs/${id}`);
}
