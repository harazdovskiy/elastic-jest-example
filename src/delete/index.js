import {client, index} from "../elastic.js";

export const deleteHandler = async (request, h) => {
  try {
    const res = await deleteById(request.params.id)
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

export const deleteAllHandler = async (request, h) => {
  try {
    const res = await deleteAll()
    return h.response(res).code(200);
  } catch (e) {
    console.log(e)
    return h.response({e}).code(400);
  }
}

export const deleteAll = async () => {
  return client.deleteByQuery({
    index,
    query: {
      match_all: {}
    }
  })
}

export const deleteById = async (id) => {
  return client.deleteByQuery({
    index,
    query: {
      match: {
        id
      }
    }
  })
}
