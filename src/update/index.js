import {client, index} from "../elastic.js";

export const updateHandler = async (request, h) => {
  try {
    const res = await updateById(request.params.id, request.payload)
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

export async function updateById(id, fields) {
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
