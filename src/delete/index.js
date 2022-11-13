const {client, index} = require("../elastic.js");

module.exports.deleteHandler = async (request, h) => {
  try {
    const res = await this.deleteById(request.params.id)
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

module.exports.deleteAllHandler = async (request, h) => {
  try {
    const res = await this.deleteAll()
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

module.exports.deleteAll = async () => {
  await client.deleteByQuery({
    index,
    query: {
      match_all: {}
    }
  })
  return {deleted: true}
}

module.exports.deleteById = async (id) => {
  await client.deleteByQuery({
    index,
    query: {
      match: {
        id
      }
    }
  })

  return {deleted: true}
}
