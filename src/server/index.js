import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { matchPath } from 'react-router-dom';
import routes from '../shared/routes';
import App from '../shared/App';
import React from 'react';
import { fetchPopularRepos } from '../shared/api';
const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  return promise
    .then(data => {
      const markup = renderToString(<App data={data} />);

      res.send(`
    <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
    `);
    })
    .catch(next);
});

app.listen(3000, () => {
  console.log('Server is listening on port: 3000');
});
