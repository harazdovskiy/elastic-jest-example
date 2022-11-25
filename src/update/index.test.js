const {client, index} = require("../elastic");
const {updateById} = require("./index");

describe('#updateById', () => {
  beforeEach(async () => {
    await client.deleteByQuery({
      index,
      query: {
        match_all: {}
      }
    })
    await client.indices.refresh({index})
  })
  it('should return objects with updated `value` field', async () => {
    await Promise.all([
      client.index({
        index,
        document: {type: 'some', value: 222, name: 'jacket', id: 'some-id'}
      })
    ])
    await client.indices.refresh({index})

    await updateById('some-id', {value: 3.44865});
    await client.indices.refresh({index})
    const updated = await client.search({
      index,
      query: {
        match: {
          id: 'some-id'
        }
      }
    })
    expect(updated.hits.hits[0]._source).toEqual({
      "id": "some-id",
      "name": "jacket",
      "type": "some",
      "value": 3
    });
  })

  it('should return objects with proper updated `type` field', async () => {
    await Promise.all([
      client.index({
        index,
        document: {type: 'some', value: 222, name: 'jacket', id: 'some-id'}
      })
    ])
    await client.indices.refresh({index})

    await updateById('some-id', {type: ' SomE333 '});
    await client.indices.refresh({index})
    const updated = await client.search({
      index,
      query: {
        match: {
          id: 'some-id'
        }
      }
    })
    expect(updated.hits.hits[0]._source).toEqual({
      "id": "some-id",
      "name": "jacket",
      "type": "some333",
      "value": 222
    });
  })

  it('should return objects with proper updated `name` field', async () => {
    await Promise.all([
      client.index({
        index,
        document: {type: 'some', value: 222, name: 'jacket', id: 'some-id'}
      })
    ])
    await client.indices.refresh({index})

    await updateById('some-id', {name: ' SomE333 '});
    await client.indices.refresh({index})
    const updated = await client.search({
      index,
      query: {
        match: {
          id: 'some-id'
        }
      }
    })
    expect(updated.hits.hits[0]._source).toEqual({
      "id": "some-id",
      "name": "SomE333",
      "type": "some",
      "value": 222
    });
  })
})
