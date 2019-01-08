const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

// Reviews - James
app.use('/api/reviews/rooms/:roomid', proxy({target: 'http://54.202.111.150'}));
app.use('/api/ratings/rooms/:roomid', proxy({target: 'http://54.202.111.150'}));

// Image Gallery - Josh
app.use('/rooms/:id/photos', proxy({target: 'http://54.175.98.175'}));

// Booking - Kevin
app.use('/api/rooms/:id', proxy({target: 'http://54.67.99.254'}));

// Recommendations - Eric
app.use('/house', proxy({target: 'http://18.223.185.89'}));

app.use('/rooms/:roomid', express.static("./public"));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
