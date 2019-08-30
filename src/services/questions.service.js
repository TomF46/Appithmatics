import Methods from '../Methods.enum'

class QuestionsService {
    constructor(){
        this.numberOfQuestions = null;
        this.includedUnits = null;
        this.secondaryUnits = null;
        this.operands = {};
    }

    generateQuestions(numberOfQuestions, includedUnits, secondaryUnits, operands){
        this.includedUnits = includedUnits;
        this.secondaryUnits = secondaryUnits;
        this.numberOfQuestions = numberOfQuestions;
        this.operands = operands;
        return this.generateSet(numberOfQuestions, includedUnits, secondaryUnits, operands);
    }

    
    generateSet(numberOfQuestions, includedUnits, secondaryUnits, operands){
        var questions = [];
        for (var i = 0; i < numberOfQuestions; i++) {
            var question = this.generateQuestion(includedUnits, secondaryUnits, operands);
            questions.push(question);
        }

        return this.ensureNoDuplicates(questions);
    }

    generateQuestion(includedUnits, secondaryUnits, operands){

        var method = this.getMethod(operands)

        var question =  {firstNumber : this.getRandomValue(includedUnits) , secondNumber : this.getRandomValue(secondaryUnits), method: method};

        if(question.method == Methods.Division){
            question = this.formatDivision(question);
            return question;
        }

        //50% chance of flipping factors
        if(this.shouldRandomise()) return this.flipFactors(question.firstNumber, question.secondNumber, method);
        return question;
    }

    getMethod(operands){
        var methods = [operands.multiplication, operands.division]
        var method = this.getMethodUsingOdds(methods);
        if(method == operands.multiplication) return Methods.Multiplication


        return Methods.Division;
    }

    getRandomValue(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    formatDivision(question){
        var firstValue = question.firstNumber * question.secondNumber;
        question.firstNumber = firstValue;
        return question;
    }

    ensureNoDuplicates(questions){

        var requiresCheck = true;

        while(requiresCheck){
            var duplicateCount = 0;

            questions.forEach((question, index) => {
                var matching = questions.filter( comparand => question.firstNumber == comparand.firstNumber && question.secondNumber == comparand.secondNumber);
                if(matching.length > 1){
                    duplicateCount++;
                    questions.splice(index, 1);
                    questions.push(this.generateQuestion(this.includedUnits, this.secondaryUnits, this.operands));
                }
            })
            if(duplicateCount == 0) requiresCheck = false;

        }
        return questions;
    }

    shouldRandomise(){
        return Math.random() >= 0.5;
    }

    flipFactors(firstNumber, secondNumber, method){
       return {firstNumber : secondNumber, secondNumber : firstNumber, method: method};
    }

    getMethodUsingOdds(methods){
        var sum = 0;
        for(var i=0;i< methods.length;i++)
        {
          sum += methods[i].chance;
        }
        var rnd = Math.floor(Math.random() * (sum * 100));
        var counter = 0;
        for(var i=0;i<methods.length;i++)
        {
          counter += methods[i].chance * 100;
          if(counter > rnd){
            return methods[i]
          }
        }
      }
      
}

export default QuestionsService