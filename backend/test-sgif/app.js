const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const request = require('request');
const PrismicConfig = require('./prismic-configuration');
const Onboarding = require('./onboarding');
const app = require('./config');
const unirest = require("unirest");

const PORT = app.get('port');

app.listen(PORT, () => {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

/*
 *  --[ INSERT YOUR ROUTES HERE ]--
 */

// Route for categories
app.route('/').get(function (req, res) {

  // Render page
  res.render('index');
});

app.route('/alumno/:uid').get(function (req, res) {

  // Define the UID from the url
  var uid = req.params.uid;

  // Query the category by its UID
  req.prismic.api.getByUID('alumno', uid).then(function (alumno) {

    console.log('lo que me devuelve la query ', alumno)

    // Render page
    res.send({ alumno: alumno });

  });
});

app.route('/chat').post(function (req, result) {
  var endpointBot = unirest("POST", "https://rapidapi.p.rapidapi.com/api.php");
  const {mensaje,usr} = req.body;

  endpointBot.headers({
    "content-type": "application/x-www-form-urlencoded",
    "x-rapidapi-key": "32759f65b6msh1f4d7b75c72d929p18b0d2jsnbddf4fb20e28",
    "x-rapidapi-host": "robomatic-ai.p.rapidapi.com",
    "useQueryString": true
  });

  endpointBot.form({
    "SessionID": `${usr}`,
    "in": `${mensaje}`,
    "op": "in",
    "cbid": "1",
    "cbot": "1",
    "ChatSource": "web",
    "key": "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP"
  });


  endpointBot.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
    result.send({ok:200, response: res.body})
  });
})