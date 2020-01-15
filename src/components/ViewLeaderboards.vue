<template>
  <div class="home">
    <select id="custom-select" v-model="viewingSet">
      <option v-for="(set, i) in questionSets" :key="i" :value="set" >{{set.name}}</option>
    </select>
    <div v-if="viewingSet">
      <appathematics-leaderboard :scores="viewingSet.scoreHistory"></appathematics-leaderboard>    
    </div>
  </div>
</template>

<script>
import Leaderboard from './Leaderboard.vue';
export default {
  name: "home",
  components:{
    "appathematics-leaderboard" : Leaderboard
  },
  data() {
    return {
      viewingSet: null,
    };
  },
  computed: {
    questionSets() {
      return this.$store.state.questionSets;
    },
  },
  methods: {
    getLeaderboards() {
      this.$storage.get("scoreHistory").then(history => {
        this.questionSets.forEach(set => {
          set.scoreHistory = set.initialHighScores;
          if(history == null) {
            return;
          }

          var scores = history.filter(score =>{ 
            return score.name == set.name;
          })
          if(scores.length > 0) set.scoreHistory = set.scoreHistory.concat(scores);
        });
        this.setDefaultViewingState();
        this.$forceUpdate();
      });
    },
    setDefaultViewingState(){
      this.$storage.get("latestViewedSet").then(set => {
        if(set == null){
          this.viewingSet = this.questionSets[0];
          return;
        }
        this.viewingSet = this.questionSets.find(questionSet => {
          return questionSet.name == set.name;
        })
      })
    }
  },
  mounted() {
    this.getLeaderboards();
  },
  watch:{
    viewingSet(){
      this.$storage.set("latestViewedSet", this.viewingSet);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
