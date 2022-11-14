import Hapi from '@hapi/hapi'
import Qs from 'qs';
import {createHandler} from "./create/index.js";
import {readHandler} from "./read/index.js";
import {updateHandler} from "./update/index.js";
import {deleteHandler} from "./delete/index.js";

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    query: {
      parser: (query) => Qs.parse(query)
    }
  });

  server.route({
    method: 'POST',
    path: '/',
    handler: createHandler
  });

  server.route({
    method: 'GET',
    path: '/{id}',
    handler: readHandler
  });

  server.route({
    method: 'PATCH',
    path: '/{id}',
    handler: updateHandler
  });

  server.route({
    method: 'DELETE',
    path: '/{id}',
    handler: deleteHandler
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
