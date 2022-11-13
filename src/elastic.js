const dotenv = require('dotenv')
dotenv.config()
const {Client} = require('@elastic/elasticsearch');

// https://www.elastic.co/guide/en/cloud-enterprise/2.3/ece-getting-started-connect.html
module.exports.client = new Client({
  node: process.env.NODE_ENV === 'test' ? 'http://localhost:9200' : process.env.ES_URL
})

module.exports.index = 'things'
