// src/config/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const endpoints = {
  admin: {
    auth: {
      login: `${API_BASE_URL}/admin/auth/login`,
    },
    prod: {
      create: `${API_BASE_URL}/admin/prod/create`,
      delete: (id) => `${API_BASE_URL}/admin/prod/delete/${id}`,
      update: `${API_BASE_URL}/admin/prod/update`,
    },
  },
  auth: {
    changePassword: `${API_BASE_URL}/auth/change-password`,
    emailConfirm: `${API_BASE_URL}/auth/email-confirm`,
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
  },
  order: {
    create: `${API_BASE_URL}/order/create`,
    add: `${API_BASE_URL}/order/add`,
    delete: `${API_BASE_URL}/order/delete`,
    update: `${API_BASE_URL}/order/update`,
  },
  prod: {
    getById: (id) => `${API_BASE_URL}/prod/${id}`,
    list: `${API_BASE_URL}/prod/list`,
  },
};

export default endpoints;
