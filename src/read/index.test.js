const {readAll, read} = require('./index');
const {client, index} = require("../elastic");
const {ulid} = require("ulid");

describe('#readAll', () => {
  beforeEach(async () => {
    await client.deleteByQuery({
      index,
      query: {
        match_all: {}
      }
    })
    await client.indices.refresh({index})
  })
  it('should return objects with all field', async () => {
    await Promise.all([
      client.index({
        index,
        document: {type: 'some', value: 222, name: 'jacket', id: ulid()}
      }),
      client.index({
        index,
        document: {type: 'some2', value: 2332, name: 'jacket2', id: ulid()}
      })
    ])
    await client.indices.refresh({index})

    const source = await readAll()

    expect(source).toEqual([
      {
        "id": expect.any(String),
        "name": "jacket",
        "type": "some",
        "value": 222
      },
      {
        "id": expect.any(String),
        "name": "jacket2",
        "type": "some2",
        "value": 2332
      },
    ]);
  })
  it('should return empty array even if not values are present', async () => {
    const source = await readAll();
    expect(source).toEqual([])
  });
})

describe('#read', () => {
  beforeEach(async () => {
    await client.deleteByQuery({
      index,
      query: {
        match_all: {}
      }
    })
    await client.indices.refresh({index})
  })
  it('should return object with all field', async () => {
    await Promise.all([
      client.index({
        index,
        document: {type: 'some', value: 222, name: 'jacket', id: 'some-id'}
      }),
      client.index({
        index,
        document: {type: 'some2', value: 2332, name: 'jacket2', id: ulid()}
      })
    ])
    await client.indices.refresh({index})

    const source = await read('some-id')

    expect(source).toEqual(
      {
        "id": "some-id",
        "name": "jacket",
        "type": "some",
        "value": 222
      }
    );
  })
})
