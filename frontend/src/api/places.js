import client from './client';

export const getPlaces = (params) => client.get('/places/', { params });
export const getPlace = (slug) => client.get(`/places/${slug}/`);
