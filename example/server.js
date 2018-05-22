const Hapi = require('hapi');
const { promisify } = require('util');

const wait = promisify(setTimeout);

const server = Hapi.server({
  port: 8080
});

const init = async () => {
  await server.register(require('../'));

  server.route({
    method: 'GET',
    path: '/add',
    handler(request, h) {
      const job = async () => {
        await wait(5000);
        return true;
      };
      request.server.queue.add(() => job()).then(() => {
        console.log('Resolved!');
      });

      return 'ok';
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};


init();
