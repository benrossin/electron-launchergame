<template>
  <div id="app" class="padtb-50 container">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import store from "@/store/GameStore";
import Vuex from "vuex";

export default {
  store: store,
  name: "app",
  components: {
    Navbar
  },
  methods: {
    ...Vuex.mapActions({
      getGamesStore: "getGames"
    })
  },
  mounted() {
    this.getGamesStore();
  }
};
</script>

<style>
html {
  --black: rgba(17.5, 17.5, 17.5);
  --grey-dark: rgba(50, 50, 50);
  --grey-light: #838383;
  --white: #f4f4f4;
  --light-blue: #3595f1;
  --dark-blue: #3579f1;
  --red: #e74c3c;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: var(--black);
  color: var(--grey-light);
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

* {
  box-sizing: border-box;
}

h1,
h2,
h3,
p {
  margin: 0;
}

a {
  text-decoration: none;
}

a:-webkit-any-link {
  color: var(--grey-light);
}

.router-link-exact-active:-webkit-any-link {
  color: var(--white);
}

li {
  list-style-type: none;
}

ul {
  padding: 0;
  margin: 0;
}

.img-fluid {
  width: 100%;
  height: auto;
  vertical-align: middle;
}

.container {
  max-width: 1330px;
  margin: 0 auto;
}

input:focus {
  outline: none;
}

.padtb-50 {
  padding: 50px 0;
}

.btn {
  text-transform: uppercase;
  color: var(--white);
  font-size: 12px;
  transition: 0.2s background-color;
  border: none;
  cursor: pointer;
  outline: 0;
}

.btn-confirm{
  background-color: var(--light-blue);
  padding: 10px 20px;
}

.btn-cancel{
  color: var(--grey-light);
  background-color: transparent;
  margin-right: 15px;
  transition: 0.25s color;
}

.btn-cancel:hover{
  color: var(--white);
}

.form-modal {
  margin-top: 50px;
}

.form-content {
  display: flex;
  flex-direction: column;
}

.form-input,
.form-buttons {
  margin-top: 15px;
}

.form-buttons {
  margin-top: 50px;
  float: right;
}

.form-input {
  display: flex;
  align-items: baseline;
}

input {
  border: none;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  caret-color: var(--white);
  color: var(--white);
  background-color: var(--grey-dark);
  padding: 10px;
  height: 40px;
}

.pad-layout{
  padding-left: 15px;
  padding-right: 15px;
}

.btn-game {
  padding: 22.5px;
  background-color: var(--grey-dark);
}

</style>
