const {create} = require("./index.js");
const {client, index} = require("../elastic");

describe('#create', () => {
  it('should insert data', async () => {
    expect.assertions(3);
    const res = await create({type: 'some', value: 100, name: 'jacket'})
    await client.indices.refresh();
    const data = await client.search({
      index,
      query: {
        match: {
          "id": res
        }
      }
    })

    expect(res).toEqual(expect.any(String))
    expect(res).toHaveLength(26);
    expect(data.hits.hits[0]._source).toEqual({
        "id": res,
        "name": "jacket",
        "type": "some",
        "value": 100
      }
    );
  })

  it('should insert and process the inserted fields', async () => {
    const res = await create({type: 'UPPERCASE', value: 25.99, name: ' spaces '})
    await client.indices.refresh();
    const data = await client.search({
      index,
      query: {
        match: {
          "id": res
        }
      }
    })
    expect(data.hits.hits[0]._source).toEqual({
        "id": res,
        "name": "spaces",
        "type": "uppercase",
        "value": 26
      }
    );
  })
});
