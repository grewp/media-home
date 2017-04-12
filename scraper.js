var Promise = require('promise');
var request = require('request');
var cheerio = require('cheerio');
var loki = require('lokijs');
var path = require('path');
//var seed = require( path.resolve( __dirname, "./db_init.js" ) );

//var url = "https://raw.github.com/mikeal/request/master/package.json";
var url = 'http://www.movingmovies.biz/index.php?p=1_22_A-Z-LIST-OF-ALL-DVDS'
movies = [];


requestp(url, true).then(function (data) {
  scrape(data);
}, function (err) {
    console.error("%s; %s", err.message, url);
    console.log("%j", err.res.statusCode);
});



function requestp(url, json) {
    json = json || false;
    return new Promise(function (resolve, reject) {
        request({url:url, json:json}, function (err, res, body) {
            if (err) {
                return reject(err);
            } else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
            resolve(body);
        });
    });
}

//not sure why moduling isn't working rn but this is a temp fix
function seed (data) {
  let database = new loki('movies.db', { autoload: true, autosave: true });
  database.addCollection('movies'); 
  let movies = database.getCollection('movies');
  
  data.forEach(function (element) {
    movies.insert({
      name: element,
      ID: '',
      owned: false
    });
  });

  database.close();

};

function scrape(data) {
  var $ = cheerio.load(data);
      $("h2:contains('LIST OF ALL DVDS')").parent().parent().siblings().each(function(i, element){
        movies[i] = $(this).text().trim();
      });
  seed(movies);
}
