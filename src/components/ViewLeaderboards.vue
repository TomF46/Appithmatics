<template>
  <div class="home">
    <set-select @setSelected="setSelected"></set-select>
    <div v-if="viewingSet">
      <appathematics-leaderboard :scores="viewingSet.scoreHistory"></appathematics-leaderboard>    
    </div>
  </div>
</template>

<script>
import Leaderboard from './Leaderboard.vue';
import SetSelect from './SetSelect.vue';
export default {
  name: "home",
  components:{
    "appathematics-leaderboard" : Leaderboard,
    SetSelect
  },
  data() {
    return {
      viewingSet: null,
    };
  },
  methods: {
      setSelected(set){
          this.viewingSet = set;
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
