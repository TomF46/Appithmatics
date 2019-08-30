import Methods from '../Methods.enum'

class AnswersService {
    constructor(){
    }

    checkIfCorrect(userAnswer, firstNumber, secondNumber, method){
        if(method == Methods.Division) return this.checkDivision(userAnswer, firstNumber, secondNumber);
        return this.checkMultiplication(userAnswer, firstNumber, secondNumber);
    }

    checkDivision(userAnswer, firstNumber, secondNumber){
        var answer = firstNumber / secondNumber;
        return userAnswer == answer;
    }

    checkMultiplication(userAnswer, firstNumber, secondNumber){
        var answer = firstNumber * secondNumber;
        return userAnswer == answer;
    }
      
}

export default AnswersService