import {client, index} from "../elastic.js";

export const readHandler = async (request, h) => {
  try {
    const res = await read(request.params.id)
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

export const readAllHandler = async (request, h) => {
  try {
    const res = await readAll()
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

export const readAll = async () => {
  const result = await client.search({
    index,
  })
  return result.hits.hits.map(({_source}) => (_source))
}

export async function read(entityId) {
  const result = await client.search({
    index,
    query: {
      match: {id: entityId}
    }
  })
  return result.hits.hits[0]._source
}
