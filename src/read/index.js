const {client, index} = require("../elastic.js");

module.exports.readHandler = async (request, h) => {
  try {
    const res = await this.read(request.params.id)
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

module.exports.readAllHandler = async (request, h) => {
  try {
    const res = await this.readAll()
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

module.exports.readAll = async () => {
  const result = await client.search({
    index, sort: [{
      name: {order: 'asc'}
    }]
  })
  return result.hits.hits.map(({_source}) => (_source))
}

module.exports.read = async (entityId) => {
  const result = await client.search({
    index, query: {
      match: {id: entityId}
    }
  })
  return result.hits.hits[0]._source
}
