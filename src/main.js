import { createApp } from "vue";
import App from "./App.vue";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
//import { createApolloProvider } from "@vue/apollo-option"
import VueApollo from "@vue/apollo-option";
import ProductComponent from "./components/ProductComponent";
import ProductsComponent from "./components/ProductsComponent";
import { createRouter, createWebHashHistory } from "vue-router";

const httpLink = createHttpLink({
  // https://api-us-east-1.graphcms.com/v2/ckxt3ez5w2gg701z3apj8cgws/master
  uri: "https://api-us-east-1.hygraph.com/v2/ckxt3ez5w2gg701z3apj8cgws/master",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient,
// })
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

const routes = [
  { path: "/", component: ProductsComponent },
  { path: "/product/:id", component: ProductComponent },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

createApp(App).use(router).provide("apollo", apolloProvider).mount("#app");
