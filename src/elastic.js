import * as dotenv from 'dotenv'
dotenv.config()
import { Client } from '@elastic/elasticsearch';

// https://www.elastic.co/guide/en/cloud-enterprise/2.3/ece-getting-started-connect.html
export const client = new Client({
  node: process.env.ES_URL
})

export const index = 'things'
