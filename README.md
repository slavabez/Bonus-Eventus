# Bonus Eventus - multiplayer dice rooms

##### This repo, except for the last commit adding this text is the repository as it was deployed to Heroku for the Node Knockout 2018

This project was made for the Node Knockout 2018 Hackathon in just under 48 hours.

See the demo here: [https://bonus-eventus.herokuapp.com](https://bonus-eventus.herokuapp.com)

### How to use

1. Create a character, choose a name, an avatar and a color that will represent you on.
2. Create and/or join a Roll Room
3. Click one of the standard dice or use the custom roller to roll any dice from 1d2 (a single roll of a 2-sided die) to 100d100 (a hundred rolls of a hundred-sided die)

Use incognito mode ot a different browser to join the same room with a different profile to see the real-time functionality

### How it works
Very simple on the inside, all data is stored in-memory on the server. Rooms keep the latest 20 messages in history (50 on the client) and delete themselves if not used in more than an hour. 

Upon creating a character a cookie with the ID is saved in the browser, which is used to attempt to restore the character. This is to prevent having to create a character every time page is refreshed.

### Tech used
* Backend. NodeJS server with Express and Socket.io. Express is used to serving the static HTML pages, while Socket.io is used for all the client-server communications in real time.
* Frontend. ReactJS is used with Styled Components for CSS-in-JS and React Easy State for global state management. CSS Flexbox and Grid were both used to help create the layouts.

### Made by
* Art and Design - Ana Bezgacheva (nbezgacheva@gmail.com) - great design and amazing artwork for the character avatars.
* Development - Slava Bezgachev (bezgachev@gmail.com) - coding the app with Node (socket.io for real-time communication) and React with react-easy-state for state management.
