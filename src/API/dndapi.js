import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/',
});

export const DnD = {
    class: axiosInstance.get('classes/'),
}