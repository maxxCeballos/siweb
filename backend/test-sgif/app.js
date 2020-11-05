const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const request = require('request');
const PrismicConfig = require('./prismic-configuration');
const Onboarding = require('./onboarding');
const app = require('./config');

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
app.route('/').get(function(req, res) {
      
    // Render page
    res.render('index');
});

app.route('/alumno/:uid').get(function(req, res) {
  
  // Define the UID from the url
  var uid = req.params.uid;
  
  // Query the category by its UID
  req.prismic.api.getByUID('alumno', uid).then(function(alumno) {

    console.log('lo que me devuelve la query ', alumno)
      
    // Render page
    res.send({alumno: alumno});
  
  });
});