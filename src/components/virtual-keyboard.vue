<template>
    <div class="virtual-keyboard">
        <div class="flex-grid">
            <div class="col">
                <button class="btn" @click="keyClick(1)" v-on:keyup.49="keyClick(1)" >1</button>
            </div>
            <div class="col">
                <button class="btn"  @click="keyClick(2)">2</button>
            </div>
            <div class="col">
                <button class="btn"  @click="keyClick(3)">3</button>
            </div>
        </div>
        <div class="flex-grid">
            <div class="col">
                <button class="btn"  @click="keyClick(4)">4</button>
            </div>
            <div class="col">
                <button class="btn"  @click="keyClick(5)">5</button>
            </div>
            <div class="col">
                <button class="btn"  @click="keyClick(6)">6</button>
            </div>
        </div>
        <div class="flex-grid">
            <div class="col">
                <button class="btn"  @click="keyClick(7)">7</button>
            </div>
            <div class="col">
                <button class="btn"  @click="keyClick(8)">8</button>
            </div>
            <div class="col">
                <button class="btn"  @click="keyClick(9)">9</button>
            </div>
        </div>
        <div class="flex-grid">
            <div class="col">
                <button class="btn" @click="keyClick('back')">
                    <i class="material-icons">
                    backspace
                    </i>
                </button>
            </div>
            <div class="col">
                <button class="btn"  @click="keyClick(0)">0</button>
            </div>
            <div class="col">
                <button class="btn enter-btn" @click="keyClick('enter')">
                    <i class="material-icons">
                        arrow_right_alt
                    </i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "virtual-keyboard",
  data() {
    return {};
  },
  computed:{
  },
  methods:{
      keyClick(key){
          this.$emit("keyClicked", key);
      }
  },
  mounted(){
    window.addEventListener("keydown", e => {
        if(e.keyCode == 13){
            this.$emit("keyClicked", 'enter');
            return;
        }
        if(e.keyCode == 8){
            this.$emit("keyClicked", 'back');
            return;
        }

        var key = String.fromCharCode(e.keyCode);
        if(!isNaN(key)) this.$emit("keyClicked", key);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .virtual-keyboard{
        margin: 20px 0;
    }
    .virtual-keyboard .flex-grid{
        margin-top: 5px;
    }
    .virtual-keyboard .flex-grid .btn{
        margin-top: 5px;
        width: 60px;
        height: 50px;;
    }
    .virtual-keyboard .enter-btn{
        background-color: #008080;
    }
    .material-back{
        font-weight: bolder;
    }
</style>
