const {index} = require('./src/elastic.js');
module.exports = () => {
  return {
    esVersion: '8.4.0',
    clusterName: 'things-cluster',
    nodeName: 'things-node',
    port: 9200,
    indexes: [
      {
        name: index,
        body: {
          settings: {
            number_of_shards: '1',
            number_of_replicas: '1'
          },
          mappings: {
            dynamic: false,
            properties: {
              id: {
                type: 'keyword'
              },
              value: {
                type: 'integer'
              },
              type: {
                type: 'keyword'
              },
              name: {
                type: 'keyword'
              },
            }
          }
        }
      }
    ]
  };
};
