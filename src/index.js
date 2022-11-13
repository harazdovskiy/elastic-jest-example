const Hapi = require('@hapi/hapi');
const Qs = require('qs');
const {createHandler} = require("./create/index.js");
const {readAllHandler, readHandler} = require("./read/index.js");
const {updateHandler} = require("./update/index.js");
const {deleteAllHandler, deleteHandler} = require("./delete/index.js");

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
    method: 'GET',
    path: '/',
    handler: readAllHandler
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

  server.route({
    method: 'DELETE',
    path: '/',
    handler: deleteAllHandler
  });

  await server.start();

  server.events.on('log', (event, tags) => {
    console.log({event}, {tags})
    if (tags.error) {
      console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
    }
  });
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
