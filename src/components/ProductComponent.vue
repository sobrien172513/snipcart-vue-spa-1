<template>
  <div class="wrapper">
    <router-link class="home" to="/">🌈</router-link>
    <div class="product" v-if="product">
      <div class="description">{{product.description}}</div>
      <div class="buy_button snipcart-add-item"
        :data-item-id="product.id"
        :data-item-price="product.price" 
        :data-item-description="product.description" 
        :data-item-image="product.image.url" 
        :data-item-name="product.title" 
        data-item-quantity="1"
        :data-item-url="`${baseUrl}/product/${product.id}`"
        data-item-custom1-name="variants"
        :data-item-custom1-options="customFieldsOptions"
      >
        Buy
        <span class="hidden_title" :style="{color: product.title}">&nbsp;{{product.title}}&nbsp;<br/></span>
        {{product.price}}$
      </div>
    </div>
  </div>
</template>

<script>
import { productQuery } from '../graphql/products'

export default {
  name: 'App',
  inject: ['apollo'],
  props: ['id'],
  data(){
    return {
      product: null,
      customFieldsOptions: '',
      baseUrl: ''
    }
  },
  mounted(){
    this.apollo.defaultClient.query(productQuery(this.$route.params.id))
      .then(({data}) => {
        this.product = data.product

        this.baseUrl = process.env.VUE_APP_BASE

        this.customFieldsOptions = data.product.customFields.variants
          .reduce((options, option) => options.concat(`|${option}`),'')

        window.document.documentElement.style.setProperty('--product-color', data.product.color)
      })
  }
}
</script>

<style scoped>
.wrapper {
  flex: 1;
  padding-top: 5%;
  padding-left: 10%;
  padding-right: 10%;
  transition: background 0.3s linear;
  background: var(--product-color);
}

.home {
  text-decoration: none;
  cursor: pointer;
  font-size: 100px;
}

.hidden_title {
  visibility: hidden;
}

.buy_button:hover {
  text-decoration: underline;
}

.buy_button:hover > .hidden_title {
  visibility: visible;
  opacity: 1;
}

.buy_button {
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
}

.description {
  width: 80%;
  margin-top: 5%;
}

.product {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

@media only screen and (max-width: 600px) {
  .product {
    font-size: 28px;
  }

  .buy_button {
    margin-top: 20px;
  }
}

@media only screen and (min-width: 600px) {
  .product {
    font-size: 60px;
  }

  .buy_button {
    margin-top: 100px;
    font-size: 60px;
  }
}

</style>
