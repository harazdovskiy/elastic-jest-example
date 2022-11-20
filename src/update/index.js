const {client, index} = require("../elastic.js");

module.exports.updateHandler = async (request, h) => {
  try {
    const res = await this.updateById(request.params.id, request.payload)
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

module.exports.updateById = (id, fields) => {
  let inline = ''
  if (fields.type) {
    inline += `ctx._source.type='${fields.type}';`;
  }

  if (fields.name) {
    inline += `ctx._source.name='${fields.name}';`;
  }

  if (fields.value) {
    inline += `ctx._source.value=${fields.value};`;
  }

  return client.updateByQuery({
    index,
    query: {
      match: {
        id
      }
    },
    script: {
      lang: "painless",
      inline
    }
  })
}
