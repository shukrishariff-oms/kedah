import client from './client';

export const getParliaments = () => client.get('/parliaments/');
export const getDUNs = () => client.get('/duns/');
