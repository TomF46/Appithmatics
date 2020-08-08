<template>
  <div>
    <h2 v-if="currentRoute == '/summary'">Local Leaderboard</h2>
    <table class="leaderboard">
      <thead>
        <th>Username</th>
        <th>Time</th>
        <th>Date</th>
      </thead>
      <tbody>
        <tr v-for="(entry, i) in leaderboard" :key="i">
          <td>{{entry.username}}</td>
          <td>{{entry.displayScore}}</td>
          <td v-if="entry.date != null">{{$moment(entry.date).format("DD/MM/YYYY")}}</td>
          <td v-else>-</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "appathematics-leaderboard",
  props: {
    scores: Array,
  },
  data() {
    return {};
  },
  computed: {
    leaderboard() {
      let descendingScores = this.scores.sort(
        (score1, score2) => score2.score - score1.score
      );
      return descendingScores.reverse().slice(0, 5);
    },
    currentRoute() {
      return this.$route.path;
    },
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.leaderboard {
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #219ff4;
  border-collapse: collapse;
  width: 300px;
}

.leaderboard thead {
  background-color: #219ff4;
  color: #fff;
}
.leaderboard tbody td,
.leaderboard thead th {
  padding: 5px;
}

.leaderboard tbody td:first-child,
.leaderboard thead th:first-child {
  text-align: left;
}
</style>
