import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://www.cinemahd-apk.com:3005/'
});
export default instance;