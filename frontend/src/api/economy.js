import client from './client';

export const getEconomyStats = () => client.get('/economy/');
