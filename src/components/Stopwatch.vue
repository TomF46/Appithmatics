<template>
  <span id="time" v-html="time"></span>
</template>

<style>
</style>

<script>
export default {
  name: "stopwatch",
  data: function () {
    return {
      state: "started",
      startTime: Date.now(),
      currentTime: Date.now(),
      interval: null,
    };
  },
  mounted: function () {
    this.interval = setInterval(this.updateCurrentTime, 1000);
  },
  destroyed: function () {
    clearInterval(this.interval);
  },
  computed: {
    time: function () {
      return this.minutes + ":" + this.seconds;
    },
    milliseconds: function () {
      return this.currentTime - this.$data.startTime;
    },
    hours: function () {
      const lapsed = this.milliseconds;
      const hrs = Math.floor(lapsed / 1000 / 60 / 60);
      return hrs >= 10 ? hrs : "0" + hrs;
    },
    minutes: function () {
      const lapsed = this.milliseconds;
      const min = Math.floor((lapsed / 1000 / 60) % 60);
      return min >= 10 ? min : "0" + min;
    },
    seconds: function () {
      const lapsed = this.milliseconds;
      const sec = Math.floor((lapsed / 1000) % 60);
      return sec >= 10 ? sec : "0" + sec;
    },
    quizComplete() {
      return this.$store.getters.getQuizComplete;
    },
    selectedQuestionSet() {
      return this.$store.state.selectedQuestionSet;
    },
    isPaused() {
      return this.$store.state.isPaused;
    },
  },
  methods: {
    reset: function () {
      this.$data.state = "started";
      this.$data.startTime = Date.now();
      this.$data.currentTime = Date.now();
    },
    pause: function () {
      this.$data.startTime = this.$data.startTime - 5000;
      this.$data.state = "paused";
    },
    resume: function () {
      this.$data.state = "started";
    },
    updateCurrentTime: function () {
      if (this.$data.state == "started") {
        this.currentTime = Date.now();
      }
    },
    getScore() {
      let score = 0;
      score = score + Number(this.minutes) * 60;
      score = score + Number(this.seconds);
      return score;
    },
  },
  watch: {
    isPaused() {
      this.isPaused ? this.pause() : this.resume();
    },
    quizComplete() {
      if (!this.quizComplete) return;

      this.pause();
      const result = {
        name: this.selectedQuestionSet.name,
        score: this.getScore(),
        displayScore: this.time,
        date: new Date(),
      };
      this.$store.commit("setLatestScore", result);
      this.$router.push("/summary");
    },
  },
};
</script>