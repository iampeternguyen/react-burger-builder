import axios from 'axios';

const axiosOrders = axios.create({
	baseURL: 'https://react-my-burger-9abe4.firebaseio.com/',
});

export default axiosOrders;
