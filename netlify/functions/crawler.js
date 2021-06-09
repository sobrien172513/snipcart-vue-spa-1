const gql = require('graphql-tag');
const { ApolloClient, createHttpLink, InMemoryCache } = require('@apollo/client/core');
const fetch = require("node-fetch");

const cache = new InMemoryCache()

const httpLink = createHttpLink({
    uri: 'https://api-ca-central-1.graphcms.com/v2/ckpn42kbid0wf01xsfl4ehoq0/master',
    fetch
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

const crawlerQuery = {
    query: gql`query {
        products {
          id,
          title,
          price
        }
      }`
}

exports.handler = async (event, context) => {
  try {
    const { data } = await apolloClient.query(crawlerQuery);
    
    return { 
        statusCode: 200, 
        body: JSON.stringify(data.products) 
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};