const gql = require('graphql-tag');
const { ApolloClient, createHttpLink, InMemoryCache } = require('@apollo/client/core');
const fetch = require("node-fetch");

const cache = new InMemoryCache()

const httpLink = createHttpLink({
    uri: 'https://api-us-east-1.graphcms.com/v2/ckxt3ez5w2gg701z3apj8cgws/master',
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
        headers: {
          'Content-Type': 'application/json',
        }, 
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