import {ulid} from 'ulid';
import {client, index} from "../elastic.js";

export const createHandler = async (request, h) => {
  if (Object.keys(request.payload))
    try {
      const res = await create(request.payload)
      return h.response(res).code(200);
    } catch (e) {
      console.log({e})
      return h.response({e}).code(400);
    }
}

export async function create(entity) {

  const {
    type,
    value,
    name,
  } = entity;

  const document = {
    id: ulid(),
    type: type.toLowerCase(),
    value: Number(value),
    name: name.trim()
  }

  await client.index({
    index,
    document
  });
  return document.id
}
