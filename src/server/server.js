const Bundler = require('parcel-bundler');
const polka = require('polka');
//const sirv = require('sirv');
const compression = require('compression');
const Gun = require('gun');

var { PORT=8080, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
console.log("dev:", dev);
if(PORT == null){PORT = process.env.PORT || 8080;}
const app = polka();
app.use(compression({ threshold: 0 }));
//app.use(sirv('public', { dev }));

const file = 'src/client/index.html'; // Pass an absolute path to the entrypoint here
const options = { // See options section of api docs, for the possibilities
  //publicUrl: 'http://localhost:8080/', // The url to serve on, defaults to '/'
  publicUrl:'/',
};
//https://github.com/parcel-bundler/parcel/issues/3098
//https://github.com/Kogia-sima/express-parcel-example/blob/master/server.js
//
const bundler = new Bundler(file, options);

//bundler.addAssetType('ext', require.resolve('./MyAsset'));
//bundler.addAssetType('js', require.resolve('./MyAsset'));//works need fix file
//                  file.?
//bundler.addPackager('js', require.resolve('./MyPackager'));//works

bundler.on('bundled', (bundle) => {
  // bundler contains all assets and bundles, see documentation for details
  console.log("bundled");
});
bundler.on('buildEnd', () => {
  // Do something...
  console.log("buildEnd");
});
bundler.on('buildStart', entryPoints => {
  // Do something...
  console.log("buildStart");
  console.log(entryPoints);
});
bundler.on('buildError', error => {
  // Do something...
  console.log("buildError");
});

const parcel_middleware = bundler.middleware();
//app.use(bundler.middleware());
app.use(parcel_middleware);
app.use(Gun.serve);

app.use('/', function(req, res, next) {
  console.log("req.originalUrl:");
  console.log(req.originalUrl);
  req.url = req.originalUrl;
  parcel_middleware(req, res, next);
});

app.listen(PORT, err => {
    if (err) throw err;
    //console.log(app);
    console.log(`> Running on localhost:`+PORT);
});
var gunconfig = {
    file: 'data',
    web:app.server //server
};
var gun = Gun(gunconfig);
//console.log(gun);
gun.on('hi', peer => {//peer connect
  //console.log('connect peer to',peer);
  console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  //console.log('disconnected from', peer);
  console.log('disconnected from peer!');
});