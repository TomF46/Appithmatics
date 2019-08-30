<template>
    <header>
      <div class="back-button" @click="backToHome()" v-if="currentRoute !='/'">
        <i @click="backToHome()" class="material-icons">arrow_back</i>
      </div>
      <span class="header-span" v-if="currentRoute == '/'">Appathematics</span>
      <span class="header-span" v-if="currentRoute == '/play'">
          <vue-stopwatch ref="stopwatch"></vue-stopwatch>
      </span> 
      <span class="header-span" v-if="currentRoute == '/summary'">Summary</span>
    </header>
</template>

<script>
import Stopwatch from './Stopwatch'

export default {
  name: "appathematics-header",
  components:{
      "vue-stopwatch" : Stopwatch
  },
  data() {
    return {};
  },
  computed:{
    inProgress(){
        return this.$store.state.isInProgress;
    },
    quizComplete(){
        return this.$store.state.quizComplete;
    },
    currentRoute(){
        return this.$route.path
    }
  },
  methods:{
      backToHome(){
        this.$store.commit("setIsInProgress", false)
        this.$store.commit("setQuizComplete", false);
        this.$router.push("/");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
header {
  margin: 0;
  background-color: #219ff4;
  color: #fff;
  position: relative;
  box-shadow: 0 4px 2px -2px #1a7fc3;
  position: fixed;
  width: 100vw;
  z-index: 9999999;
}
.back-button{
    position: absolute;
    top: 25%;
    z-index: 999;
    margin-left: 10px;
}
.back-button .material-icons{
    font-size: 36px;
    cursor: pointer;
}

header .header-span {
  display: block;
  position: relative;
  font-size: 32px;
  line-height: 1;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
  padding-bottom: 16px;
  text-align: center;
}

header .time{
    padding: none;
}
</style>
