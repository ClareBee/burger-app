import axios from 'axios';

const instance = axios.create({
    baseURL:  'https://react-my-burger-9d24d.firebaseio.com/'
});

export default instance;
