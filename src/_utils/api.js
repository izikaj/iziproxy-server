import axios from 'axios';
import { ApiConfig } from './api_config';

class BaseApi {
  setupSessionNamespace() {
    console.log('setupSessionNamespace');
    this.session = {
      show: (params) => {
        return axios.get('/api/session.json', params);
      },
      create: (params) => {
        return axios.post('/api/session.json', params);
      },
      destroy: () => {
        return axios.delete('/api/session.json');
      },
    };
  }

  setupProfileNamespace() {
    console.log('setupProfileNamespace');
    this.profile = {
      show: () => {
        return axios.get('/api/profile.json');
      },
      update: (params) => {
        return axios.post('/api/profile.json', params);
      },
    };

    this.servers = {
      list: () => {
        return axios.get('/api/servers.json');
      },
    };
  }

  constructor() {
    this.config = new ApiConfig();

    this.setupSessionNamespace();
    this.setupProfileNamespace();

    BaseApi.self = this;
    console.log('API INITIALIZED');
  }
}

export const Api = BaseApi.self || new BaseApi();
