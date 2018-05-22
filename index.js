const PQueue = require('p-queue');
const aug = require('aug');

const register = (server, options) => {
  const defaultOptions = {
    concurrency: 1,
    key: false,
    path: '/_queue'
  };
  options = options || {};
  const opts = aug({}, defaultOptions, options);

  const queue = new PQueue({ concurrency: opts.concurrency });

  server.decorate('server', 'queue', queue);

  server.route({
    method: 'GET',
    path: opts.path,
    handler(request, h) {
      return {
        size: queue.size,
        pending: queue.pending
      };
    }
  });
};

exports.plugin = {
  register,
  pkg: require('./package.json')
};
