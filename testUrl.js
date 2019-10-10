// var request = require("request");

// var options = {
//   method: 'GET',
//   url: 'http://localhost:4000/movies',
//   headers: {authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik16TXdOemxHUVVRM056VkZNalUwTmpGRk5USkRNVGN5UWtOQk9EZ3hSVFJHT0RJd09FTTVRUSJ9.eyJpc3MiOiJodHRwczovL21vdmllZGV0YWlscy5hdXRoMC5jb20vIiwic3ViIjoiQ25Bc2RPSmNPdUhyandkbXBqcGgwaktUVlRid21WWWVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbW92aWUtZGV0YWlscy8iLCJpYXQiOjE1NzA1OTk1NzQsImV4cCI6MTU3MDY4NTk3NCwiYXpwIjoiQ25Bc2RPSmNPdUhyandkbXBqcGgwaktUVlRid21WWWUiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.D3_QPiu79aL4Wp4sxGo7mU4MB_sdJR09AVUJ-SI5BXJkYsBuahPejfiiOpOkPpSMk8obzCkaOU7o0JRlrSsqHyi5R5b7zDkmanqH-l5EaRUgODXkiAFT1M7XNvbThIizKcK25f0Yj1c9l8w39TOjYy8harhRhkDlKNhdtHFLDE7QBVmGH1DL7ClawcpeOPm85ww66W00KfkLLve0odjAucBtjuneuZcX62BofqwsfHeeuTWQVWSuiHPhdETFHgx8nkT37volho2MU5znGBEtjZjJrBRyDVsbGgRcoIrr-TbppAbT-188-Pn6WgKFlnhHWev56Ey4OmzIpKDS7rPLrg'}
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

// --------------------------------

var request = require("request");

var options = { method: 'POST',
  url: 'https://moviedetails.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"m6EPMuxhFWrDnglh5Gzaqwloda8BhnD1","client_secret":"lD-M-WczlqcIusm2D9f0pGb-Cofl3Pp3hxEzjZWYUXp98ehZXqs2DFeH9y6NsNwe","audience":"https://movie-details/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// --------------------------------

// var request = require("request");

// var options = {
//   method: 'POST',
//   url: 'https://auth0-express-test.auth0.com/oauth/token',
//   headers: {'content-type': 'application/x-www-form-urlencoded'},
//   form: {
//     grant_type: 'client_credentials',
//     client_id: 'yITztqK52SBxXkP5WSkobccQ3P06Oo7q',
//     client_secret: 'YOUR_CLIENT_SECRET',
//     audience: 'YOUR_API_IDENTIFIER'
//   }
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

// --------------------------------

// sample with id and secret of unauthorized app getting access token

var request = require("request");

var options = {
  method: 'POST',
  url: 'https://moviedetails.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {
    grant_type: 'client_credentials',
    client_id: '4Jbyr63iIIdYfoGzDPo45SAkyAOcywS3',
    client_secret: 'EpZTRc42labBpbB-W1VZnwdfgVYSa6NTaFh6tPIAYbb00fLVdJdJlHsUkx6cB4SU',
    audience: 'https://movie-details/'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});