import _ from 'lodash';

let all = {
  env: process.env.NODE_ENV,
};

export default _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {});
