<template>
  <div class="home">
    <img src="../assets/logo.jpg" class="logo" />
    <h2 class="welcome">Welcome to Appathematics</h2>
    <p>Choose your level from the drop down below and click the start button to begin</p>
    <p>The higher the number of questions the harder the possible questions become</p>
    <set-select @setSelected="setSelected"></set-select>
    <div v-if="viewingSet">
      <button class="btn startBtn round" @click="start">Start</button>
    </div>
    <router-link id="leaderboard-link" to="/leaderboards">View Leaderboards</router-link>
  </div>
</template>

<script>
import SetSelect from "./SetSelect.vue";
export default {
  name: "home",
  data() {
    return {
      viewingSet: null,
    };
  },
  components: {
    SetSelect,
  },
  methods: {
    start() {
      this.$store.commit("setSelectedQuestionSet", this.viewingSet);
      this.$router.push("/play");
    },
    setSelected(set) {
      this.viewingSet = set;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home {
  margin-bottom: 10px;
}
.logo {
  width: 200px;
}
.relative {
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

.welcome {
  margin-top: 0px;
}

#leaderboard-link {
  color: #219ff4;
  text-decoration: underline;
}
</style>
