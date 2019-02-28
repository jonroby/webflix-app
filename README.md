# Webflix

## Live 
To see the site please visit it at https://safe-caverns-26267.herokuapp.com/
The server is accessible at https://webflix-server.herokuapp.com

## Getting Started

To start up the site locally:

First obtain an api token from the [MovieDB](https://www.themoviedb.org).

```
> git clone https://github.com/jonroby/webflix-server.git
> npm i && node server.js
```

Add the token to `config.js`:

```
  moviedbApiKey: process.env.api_key || <YOUR_TOKEN_HERE>
```

Then clone the frontend.

```
> git clone https://github.com/jonroby/webflix-app.git
> npm i && npm start
```

It's ready!

## Notes

Coming shortly.




