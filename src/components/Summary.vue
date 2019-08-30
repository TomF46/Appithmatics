<template>
  <div class="summary">
    <h2>Congratulations</h2>
    <p>You finished it in...</p>
    <h1 v-if="latestScore">{{latestScore.displayScore}}</h1>
    <div v-if="!scoreSubmitted">
        <p>Please enter your name for the leaderboards.</p>
        <input type="text" class="styledInput" v-model="name" required  minlength="3" maxlength="10">
        <button class="btn tryAgain round" @click="submit()">Submit!</button>
    </div>
    <div v-else>
        <appathematics-leaderboard :scores="selectedQuestionSet.scoreHistory"></appathematics-leaderboard>  
        <button class="btn tryAgain round" @click="tryAgain()">Try again!</button>
    </div>
  </div>
</template>

<script>
import Leaderboard from './Leaderboard.vue'
export default {
  name: 'summary-page',
  components:{
    "appathematics-leaderboard" : Leaderboard
  },
  data () {
    return {
        name: "",
        scoreSubmitted: false,
    }
  },
  computed:{
      latestScore(){
          return this.$store.state.latestScore;
      },
      selectedQuestionSet(){
          return this.$store.state.selectedQuestionSet;
      },
  },
  methods: {
      tryAgain(){
          this.$store.commit("setQuizComplete", false);
          this.$router.push("/play");
      },
      submit(){
          console.log(this.name);
          if(this.name == null || this.name == "") return;

          var result = this.latestScore;
          this.latestScore.username = this.name;

          this.$storage.get("scoreHistory").then(history => {
                if(history == null) history = [];
                history.push(result);
                this.$storage.set("scoreHistory", history);
                this.scoreSubmitted = true;
            })

        this.selectedQuestionSet.scoreHistory.push(result);
      }
  },
  mounted(){
      if(this.selectedQuestionSet == null) this.$router.push("/");
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.summary{
    padding-top: 20px;
}
.tryAgain{
    margin-top: 40px;
}

.styledInput{
    height: 50px;
    width: 300px;
    font-size: 2.5rem;
    text-align: center;
    color: #219ff4;
    border: 2px solid #219ff4;
}
</style>
