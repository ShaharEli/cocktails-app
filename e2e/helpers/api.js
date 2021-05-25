const API_URL = 'http://localhost:8000';
const ADMIN_PATH = '/_routes';
global.fetch = require('node-fetch');
const {existsSync, mkdirSync, writeFileSync, readFileSync} = require('fs');
const {resolve} = require('path');

const getId = () => new Date().toLocaleString().split(', ')[0];
class Api {
  constructor() {
    this.baseUrl = API_URL;
    this.adminPath = ADMIN_PATH;
    this.addedRoutes = [];
    this.current = {};
  }

  nock(path) {
    this.current.path = path;
    return this;
  }

  method(method) {
    this.current.method = method;
    return this;
  }

  status(status) {
    if (this.current?.response) {
      this.current.response.status = status;
    } else {
      this.current.response = {status};
    }
    return this;
  }

  async send(response) {
    if (response) {
      if (this.current?.response) {
        this.current.response.body = response;
      } else {
        this.current.response = {body: response, status: 200};
      }
    }
    const res = await this._addRoute(this.current);
    const {method, path} = this.current;
    this.current = {};
    if (!res.error) {
      const getStats = () => this._getStats(method, path);
      return {
        getStats,
        getCount: async () => {
          const stats = await getStats();
          return stats.count;
        },
        getStubRequests: async () => {
          const stats = await getStats();
          return stats.stubRequests;
        },
        deleteRoute: () => {
          return this._handleRoutes({method, path}, 'delete');
        },
      };
    }
    return res;
  }

  async _getStats(method, path) {
    const response = await fetch(
      `${this.baseUrl + this.adminPath}?method=${method}&path=${path}`,
      {
        method: 'GET',
      },
    );
    return response.json();
  }

  async _handleRoutes(data, method) {
    const response = await fetch(this.baseUrl + this.adminPath, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async _addRoute(routeData) {
    if (!routeData) {
      return {error: 'Data not provided'};
    }
    try {
      const {method, path} = routeData;
      const response = await this._handleRoutes(routeData, 'POST');
      this.addedRoutes.push({method, path});
      return response;
    } catch (e) {
      return {error: e.message};
    }
  }

  async finishTest() {
    try {
      const response = await fetch(`${this.baseUrl + this.adminPath}/all`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (e) {
      return {error: e.message};
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _removeQuery(route) {
    return route.split('?')[0];
  }

  prepareMocks(
    name = getId(),
    response,
    route,
    limit,
    sentData,
    withQueryParams = true,
  ) {
    try {
      console.log('mock sent');
      const path = resolve('e2e', 'mocks');
      if (!existsSync(path)) {
        mkdirSync(path, {recursive: true});
        console.log('directory created');
      }
      const filePath = `${path}/${name}.json`;
      const exists = existsSync(filePath);

      const data = {
        route: withQueryParams ? route : this._removeQuery(route),
        response,
        sentData,
      };

      if (exists) {
        const prevData = JSON.parse(readFileSync(filePath));
        if (limit) {
          const count = prevData.reduce((n, val) => {
            return (
              n +
              (this._removeQuery(val.route) === this._removeQuery(route)
                ? 1
                : 0)
            );
          }, 0);
          if (count > limit) {
            return;
          }
        }
        writeFileSync(filePath, JSON.stringify([...prevData, data]));
      } else {
        writeFileSync(filePath, JSON.stringify([data]));
        console.log('file created');
      }
    } catch ({message}) {
      console.log('oop err:', message);
    }
  }
}

export const api = new Api();
