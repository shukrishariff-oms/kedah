import client from './client';

export const getDistricts = () => client.get('/districts/');
export const getDistrict = (slug) => client.get(`/districts/${slug}/`);
