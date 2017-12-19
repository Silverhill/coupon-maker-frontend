const path = require('path');

const res = require.context('./stories/', false, /\.story.js/)
res.keys().forEach(moduleName => {
  require( `./${ path.join( 'stories/', moduleName ) }` ); // eslint-disable-line
})
