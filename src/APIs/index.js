import React from 'react';
import axiosconfig from '../Providers/axios';

export const postApi = async (api, data, token) => {
  let response;
  await axiosconfig
    .post(api, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then(res => {
      response = res?.data;
    })
    .catch(err => {
      response = err?.response;
    });
  return response;
};

export const getApi = async (api, token) => {
  let response;
  await axiosconfig
    .get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then(res => {
      response = res?.data;
    })
    .catch(err => {
      response = err?.response;
    });
  return response;
};
