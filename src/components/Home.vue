<template>
  <div class="home">
    <img src="../assets/logo.jpg" class="logo" />
    <h2 class="welcome">Welcome to Appathematics</h2>
    <p>Choose your level from the drop down below and click the start button to begin</p>
    <p>The higher the number of questions the harder the possible questions become</p>
    <select id="custom-select" v-model="viewingSet">
      <option v-for="(set, i) in questionSets" :key="i" :value="set" >{{set.name}}</option>
    </select>
    <div v-if="viewingSet">
      <button class="btn startBtn round" @click="start">Start</button>
    </div>
    <router-link id="leaderboard-link" to="/leaderboards">View Leaderboards</router-link>
  </div>
</template>

<script>
export default {
  name: "home",
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
    start() {
      this.$store.commit("setSelectedQuestionSet", this.viewingSet);
      this.$router.push("/play");
    },
    setLeaderboards() {
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
    this.setLeaderboards();
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
.home{
  margin-bottom: 10px;
}
.logo{
  width: 200px;
}
.relative{
  position: relative;
}
.startBtn {
  padding: 20px 40px;
  margin: 20px 0px 20px 0px;
}
.startBtn.middle {
  position: absolute;
  top: 50%;
}
.home .intro-text {
  margin-top: 10%;
}

.best-score h1{
  margin: 5px 0;
}

.set-select{
  margin-top: 20px;
  width: 200px;
  font-size: 26px;
  text-align: center;
  color: #219ff4;
}

select#soflow, select#custom-select {
  text-align-last:center;
   -webkit-appearance: button;
   -webkit-border-radius: 2px;
   -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
   -webkit-padding-end: 20px;
   -webkit-padding-start: 2px;
   -webkit-user-select: none;
   background-image: url(/static/img/dropdown.png), -webkit-linear-gradient(#FAFAFA, #F4F4F4 40%, #E5E5E5);
   background-position: 97% center;
   background-repeat: no-repeat;
   border: 1px solid #AAA;
   color: #555;
   font-size: 26px;
   margin: 20px;
   overflow: hidden;
   padding: 5px 10px;
   text-overflow: ellipsis;
   white-space: nowrap;
   width: 300px;
   -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
}

select#custom-select {
   color: #fff;
   background-image: url(/static/img/dropdown.png), -webkit-linear-gradient(#219ff4, #219ff4 40%, #219ff4);
   background-color: #219ff4;
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius: 20px;
   padding-left: 15px;
}

/* IE fix for custom select box */
select#custom-select::-ms-expand {
    display: none;
}

.welcome{
  margin-top: 0px;
}

#leaderboard-link{
  color: #219ff4;
  text-decoration: underline;
}

@media only screen and (max-width: 800px) and (orientation: landscape) {
  .best-score {
    margin-top: 10px;
  }
}
</style>
