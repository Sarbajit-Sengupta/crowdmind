import { Client } from "@elastic/elasticsearch";

const node = process.env.ELASTICSEARCH_URL?.trim();
const apiKey = process.env.ELASTICSEARCH_API_KEY?.trim();

if (!node) {
  throw new Error("Missing ELASTICSEARCH_URL");
}

if (!apiKey) {
  throw new Error("Missing ELASTICSEARCH_API_KEY");
}

const elasticClient = new Client({
  node,
  auth: {
    apiKey,
  },
});

export default elasticClient;