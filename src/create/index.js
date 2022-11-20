const {ulid} = require('ulid');
const {client, index} = require("../elastic.js");

module.exports.createHandler = async (request, h) => {
  if (Object.keys(request.payload))
    try {
      const res = await this.create(request.payload)
      return h.response(res).code(200);
    } catch (e) {
      console.log({e})
      return h.response({e}).code(400);
    }
}

module.exports.create = async (entity) => {
  const {
    type,
    value,
    name,
  } = entity;

  const document = {
    id: ulid(),
    type: type.trim().toLowerCase(),
    value: +value.toFixed(0),
    name: name.trim()
  }

  await client.index({
    index,
    document
  });
  return document.id
}
