import Vue from "vue";
import Vuex from "vuex";
import Configuration from '../configuration.json';
import TestConfiguration from '../configuration.dev.json';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        configuration: {},
        questionSets: [],
        selectedQuestionSet: null,
        isInProgress: false,
        quizComplete: false,
        isPaused: false,
        latestScore: null,
    },
    getters:{
        getConfiguration(state){
            return state.configuration;
        },
        getQuestionSets(state){
            return state.questionSets;
        },
        getSelectedQuestionSet(state){
            return state.selectedQuestionSet;
        },
        getIsInProgress(state){
            return state.isInProgress;
        },
        getQuizComplete(state){
            return state.quizComplete;
        },
        getIsPaused(state){
            return state.isPaused;
        },
        getLatestScore(state){
            return state.latestScore;
        }
    },
    mutations: {
        setConfiguration(state, configuration){
            state.configuration = configuration;
        },
        setQuestionSets(state, sets){
            state.questionSets = sets;
        },
        setSelectedQuestionSet(state, set){
            state.selectedQuestionSet = set;
        },
        setIsInProgress(state, status){
            state.isInProgress = status;
        },
        setQuizComplete(state, status){
            state.quizComplete = status;
        },
        setIsPaused(state, status){
            state.isPaused = status;
        },
        setLatestScore(state, score){
            state.latestScore = score;
        }
    },
    actions:{
        loadConfiguration({commit}){
            return new Promise((resolve, reject) => {

                var configuration = {};

                if(process.env.NODE_ENV == "development"){
                    configuration = TestConfiguration
                }else{
                    configuration = Configuration
                }

                commit("setConfiguration", configuration);
                commit("setQuestionSets", configuration.questionSets);
                resolve();
            });
        }

    }
  })
  
export default store;