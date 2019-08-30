<template>
  <div class="play flex-container">
    <div class="play-area">
        <p class="question-count">Question {{questionNumber}} of {{questions.length}}</p>
        <p v-if="activeQuestion" class="question-text">{{activeQuestion.firstNumber}} {{operand}} {{activeQuestion.secondNumber}}</p>
        <input type="tel" disabled ref="input" v-model="currentAnswer" maxlength="4" :class="inputClass" @input="onInput"  @keyup.enter="submitAnswer"><br>
        <virtual-keyboard @keyClicked="onKeyClicked"></virtual-keyboard>
        <!-- <i class="material-icons pause" @click="pause">
            pause_circle_outline
        </i> -->
    </div>

  </div>
</template>

<script>
import QuestionsService from '../services/questions.service.js';
import AnswersService from '../services/answers.service.js';
import VirtualKeyboard from './virtual-keyboard';
import Methods from '../Methods.enum.js';
export default {
  name: 'play',
  components:{
      "virtual-keyboard" : VirtualKeyboard
  },
  data () {
    return {
        questions: [],
        questionIndex: 0,
        currentAnswer: null,
        inputClass : '',
        questionsService : new QuestionsService(),
        answersService: new AnswersService()
    }
  },
  computed:{
      configuration(){
          return this.$store.state.configuration;
      },
      selectedQuestionSet(){
          return this.$store.state.selectedQuestionSet;
      },
      inProgress(){
          return this.$store.state.isInProgress;
      },
      activeQuestion(){
          return this.questions[this.questionIndex];
      },
      questionNumber(){
          return this.questionIndex + 1;
      },
      operand(){
          if(this.activeQuestion.method == Methods.Division) return "÷";
          if(this.activeQuestion.method == Methods.Addition) return "+";
          if(this.activeQuestion.method == Methods.Subtraction) return "-";

          return "x";
      },
      isPaused(){
        return this.$store.state.isPaused;
        }
  },
  methods:{
      submitAnswer(){
          this.resetInputClass();
          var isCorrect = this.answersService.checkIfCorrect(this.currentAnswer, this.activeQuestion.firstNumber, this.activeQuestion.secondNumber, this.activeQuestion.method);
          isCorrect ? this.handleCorrectAnswer() : this.handleIncorrectAnswer(); 
          this.$refs.input.focus();
      },
      handleCorrectAnswer(){
          this.playSound('./static/sounds/success.wav')
          this.currentAnswer = null;
          this.questionIndex++;
          if(this.questionIndex == this.questions.length) this.handleQuizComplete();
      },
      handleIncorrectAnswer(){
          this.$nextTick(() => {
              this.inputClass = "incorrect";
          })
      },
      handleQuizComplete(){
          this.$store.commit("setIsInProgress", false);
          this.$store.commit("setQuizComplete", true);
      },
      onKeyClicked(key){
          this.resetInputClass();
          if(key == "enter"){
              this.submitAnswer();
              return;
          }

          if(key == "back"){
              this.handleBackButton();
              return;
          }
          
          if(this.currentAnswer == null){
              this.currentAnswer = String(key);
              return;
          }

          if(this.currentAnswer.length >= 3) return;

          this.currentAnswer = this.currentAnswer + String(key);
      },
      handleBackButton(){
          if(this.currentAnswer == null) return;
          this.currentAnswer = this.currentAnswer.slice(0,-1);
      },
      playSound (sound) {
        if(sound) {
            var audio = new Audio(sound);
            audio.play();
        }
      },
      pause(){
          this.$store.commit("setIsPaused", !this.isPaused);
      },
      onInput(){
          this.resetInputClass();
      },
      resetInputClass(){
          this.inputClass = "";
      },
      generateQuestions(){
            this.questions = this.questionsService.generateQuestions(this.selectedQuestionSet.numberOfQuestions ,this.selectedQuestionSet.includedNumbers, this.selectedQuestionSet.secondaryNumbers, this.selectedQuestionSet.operands)
            this.$store.commit("setIsInProgress", true)
            this.$refs.input.focus();
      }
  },
  mounted(){
      if(this.selectedQuestionSet == null) this.$router.push("/");
      this.generateQuestions();   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.play-area{
    padding-top: 40px;
    width: 260px;
}
.play-area .question-count{
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 0;
}
.play-area .question-text{
    font-size: 5rem;
    margin-top: 5px;
    margin-bottom: 5px;
}
.play-area .question-text.equals{
    font-size: 2rem;
}
.play-area input{
    height: 100px;
    width: 100px;
    font-size: 4rem;
    text-align: center;
    color: #219ff4;
    border: 2px solid #219ff4;
}
.play-area input:disabled{
    background-color: #fff;
    opacity: 1;
    color: #219ff4;
    -webkit-text-fill-color:#219ff4
}
.submit{
    margin-top: 40px;
}

.pause{
    color: #219ff4;
    font-size: 56px;
}

@media only screen 
  and (max-width: 800px)
  and (orientation: landscape) {
    .play-area{
        padding-top: 20px;
    }
    .play-area .question-count{
        font-size: 1.5rem;
        margin-top: 0;
        margin-bottom: 0;
    }
    .play-area .question-text{
        font-size: 4rem;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .play-area input{
        height: 60px;
        width: 60px;
    }
    .submit{
        margin-top: 20px;
    }
}

.incorrect {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  border: 2px solid #f00!important;
}

.incorrect:focus {
  outline: none !important;
  border: 2px solid #f00;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
