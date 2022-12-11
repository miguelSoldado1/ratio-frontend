# Ratio Frontend

- A music rating and discovery web app using the spotify API.
- https://ratiomusic.site

## About the project

Ratio is a web app made for music lovers by a music lover.
It leverages the spotify API to display up to date information about new albums and
to show user specific recommended albums.
## Tech/Stack

- The application is built using the MERN stack. 
- The frontend is built with 
[ReactJS](https://reactjs.org) and [Zustand](https://github.com/pmndrs/zustand) 
for global state managing it uses. Our [backend](https://github.com/miguelSoldado1/ratio-backend)
is a REST API with [ExpressJS](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/home)
for the database. 
- the [backend](https://github.com/miguelSoldado1/ratio-backend) 
also heavily uses the [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node).
- Also the frontend is deployed in [Vercel](https://vercel.com/) and the backend is 
deployed in [Railway](https://railway.app/).
## Setup/Environment Variables

1. To run this project, you will need to run 2 terminal instances with the frontend and the
backend.
2. Run `npm install` for both directories.
3. Create a `.env` file with the following variables:
```
REACT_APP_BACK_END_URL=http://localhost:5000
```
4. Run `npm start` to start the directory.
