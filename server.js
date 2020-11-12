const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
let querystring = require("query-string");

let redirect_uri = `${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

app.prepare().then(() => {
  const server = express();

  server.get("/login", (req, res) => {
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
          scope: "user-read-private user-read-email",
          redirect_uri,
        })
    );
  });

  server.get("/", (req, res) => {
    return app.render(req, res, "/", req.query);
  });

  server.get("/callback", (req, res) => {
    return app.render(req, res, "/callback", req.query);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
