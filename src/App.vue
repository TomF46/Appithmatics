<template>
  <div id="app">
    <appathematics-header></appathematics-header>
    <main>
      <transition
            name="fade"
            mode="out-in"
            >
      <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components:{
    "appathematics-header" : Header
  },
  data: function() {
    return {
    };
  },
  mounted(){
    this.$store.dispatch("loadConfiguration");
  }
}
</script>

<style>
html, body {
    height: 100%;
}

body {
  margin: 0;
  background-color: #fff;
  color: #219ff4;
}

.flex-grid {
  display: flex;
}
.col {
  flex: 1;
}

#app {
  min-height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  text-align: center;
  padding-top: 65px;
}

.flex-container {
    height: 100%;
    padding: 0;
    margin: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn{
  border-radius: 2px;
  border: 0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  outline: 0;
  padding: 8px 20px;
  vertical-align: middle;
  background: #219ff4;
  color: #fff;
  font-size: 34px;
  font-weight: 500;
}

.btn.round{
  border-radius: 20px;
  padding: 4px 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

span, h1, h2, h3, h4, h5, button, .question-text, input, option, select{
  font-family: "curse_casualregular", Roboto, Arial;
}

.bold{
  font-weight: bold;
}

</style>
