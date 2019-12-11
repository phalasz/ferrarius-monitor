import http from 'superagent';

const SERVER_URL = process.env.MASTER_SERVER_URL ||
  `${window.location.protocol}//${window.location.host}`;

const ENDPOINT = `${SERVER_URL}/ferrarius/api`;

export function fetchServerList() {
  return http.get(`${ENDPOINT}/list`).
      accept('application/json');
}
