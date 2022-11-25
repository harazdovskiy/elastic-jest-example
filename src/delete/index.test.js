const {deleteAll, deleteById} = require("./index.js");
const {client, index} = require("../elastic");
const {ulid} = require("ulid");

describe('#deleteAll', () => {
  it('should delete all records', async () => {
    await client.index({
      index,
      document: {type: 'some', value: 222, name: 'jacket'}
    })
    await client.indices.refresh({index})

    await deleteAll();

    await client.indices.refresh({index})
    const data = await client.search({
      index,
      query: {
        match_all: {}
      }
    })

    expect(data.hits).toEqual({
      "hits": [],
      "max_score": null,
      "total": {
        "relation": "eq",
        "value": 0
      }
    })

  })
});

describe('#deleteById', () => {
  it('should delete specific record', async () => {
    const id = 'some-id'
    await Promise.all([
      client.index({
        index,
        document: {type: 'some', value: 222, name: 'jacket', id}
      }),
      client.index({
        index,
        document: {type: 'some2', value: 2332, name: 'jacket2', id: ulid()}
      })
    ])
    await client.indices.refresh({index})

    await deleteById(id);

    await client.indices.refresh({index})
    const data = await client.search({
      index,
      query: {
        match_all: {}
      }
    })

    expect(data.hits.hits[0]._source).toEqual({
      "id": expect.any(String),
      "name": "jacket2",
      "type": "some2",
      "value": 2332
    })

  })
});
