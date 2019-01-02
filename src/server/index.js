import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import App from '../shared/App';
import React from 'react';
import { fetchPopularRepos } from '../shared/api';
const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res, next) => {
  return fetchPopularRepos().then(data => {
    console.log(data instanceof Array);
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
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port: 3000');
});
