import axios from '../axios';


const clientSecret = window.env.REACT_APP_CLIENT_SECRET
const clientId = window.env.REACT_APP_CLIENT_ID

export const login = async (credential) => {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('username', credential.username);
    params.append('password', credential.password);
    params.append('grant_type', 'password');
    params.append('agent', 'admin-user');
    params.append('client_secret', clientSecret);
    return axios.post('/auth/realms/opex/protocol/openid-connect/token', params)
};

