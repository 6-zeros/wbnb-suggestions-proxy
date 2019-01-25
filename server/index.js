require('newrelic');
const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

// Reviews - Josh
// app.use('/api/reviews/rooms/:roomid', proxy({target: 'http://54.202.111.150'}));
// app.use('/api/ratings/rooms/:roomid', proxy({target: 'http://54.202.111.150'}));

// Image Gallery - James
app.use('/rooms/:id/photos', proxy({ target: 'http://54.201.165.207' }));

// // Booking - George
app.use('/api/rooms/:id', proxy({ target: 'http://54.193.63.77:3000' }));

// // Recommendations - Seyma
app.use('/:id/suggestions', proxy({ target: 'http://13.57.206.20:3123' }));

app.use('/rooms/:roomid', express.static("./public"));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
