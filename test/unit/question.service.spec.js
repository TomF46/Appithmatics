import QuestionsService from '../../src/services/questions.service'
import Methods from '../../src/Methods.enum';

describe("Dimensions Service", () => {
    let questionsService;

    beforeAll(() => {
        questionsService = new QuestionsService();
    });

    it('Should return an array with the target number of questions', () => {
        var numberOfQuestions = 50;
        var includedNumbers = [1,2,3,4,5,6,7,8,9,10];
        var secondaryNumbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
        var operands ={
            multiplication: {
                chance: 1
            },
            division : {
                chance: 0
            }
        };
        var questions = questionsService.generateQuestions(numberOfQuestions, includedNumbers, secondaryNumbers, operands)
        expect(questions.length).toBe(50);
    });

    it('Should return an array with the target number of questions 2', () => {
        var numberOfQuestions = 100;
        var includedNumbers = [1,2,3,4,5,6,7,8,9,10];
        var secondaryNumbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
        var operands ={
            multiplication: {
                chance: 1
            },
            division : {
                chance: 0
            }
        };
        var questions = questionsService.generateQuestions(numberOfQuestions, includedNumbers, secondaryNumbers, operands)
        expect(questions.length).toBe(100);
    });

    it('Should return an array without any duplicates', () => {
        var numberOfQuestions = 50;
        var includedNumbers = [1,2,3,4,5,6,7,8,9,10];
        var secondaryNumbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
        var operands ={
            multiplication: {
                chance: 1
            },
            division : {
                chance: 0
            }
        };
        var questions = questionsService.generateQuestions(numberOfQuestions, includedNumbers, secondaryNumbers, operands)
        
        var duplicates = 0;

        questions.forEach((question, index) => {
            var matching = questions.filter( q2 => question.firstNumber == q2.firstNumber && question.secondNumber == q2.secondNumber);
            if(matching.length > 1){
                duplicateCount++;
            }
        })

        expect(duplicates == 0).toBeTruthy();

    });
    
    it('Should return an array without any duplicates 2', () => {
        var numberOfQuestions = 100;
        var includedNumbers = [1,2,3,4,5,6,7,8,9,10];
        var secondaryNumbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
        var operands ={
            multiplication: {
                chance: 1
            },
            division : {
                chance: 0
            }
        };
        var questions = questionsService.generateQuestions(numberOfQuestions, includedNumbers, secondaryNumbers, operands)
        
        var duplicates = 0;

        questions.forEach(question => {
            var matching = questions.filter( q2 => question.firstNumber == q2.firstNumber && question.secondNumber == q2.secondNumber);
            if(matching.length > 1){
                duplicateCount++;
            }
        })

        expect(duplicates == 0).toBeTruthy();

    });

    it('Should not return question set with any questions both factors not included in included factors', () => {
        var numberOfQuestions = 50;
        var includedNumbers = [1,2,3,4,6,8,10];
        var secondaryNumbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
        var operands ={
            multiplication: {
                chance: 1
            },
            division : {
                chance: 0
            }
        };
        var questions = questionsService.generateQuestions(numberOfQuestions, includedNumbers, secondaryNumbers, operands)

        var outOfRange = 0;

        questions.forEach(question => {
            var erroneous = !includedNumbers.includes(question.firstNumber) && !includedNumbers.includes(question.secondNumber);
            if(erroneous) outOfRange++;
        })

        expect(outOfRange == 0).toBeTruthy();
    })

    it('Should not return a question where both factors are not included in included factors when calling generateQuestion', () => {
        var includedNumbers = [1,2,3,4,6,8,10];
        var secondaryNumbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
        var operands ={
            multiplication: {
                chance: 1
            },
            division : {
                chance: 0
            }
        };
        var question = questionsService.generateQuestion(includedNumbers, secondaryNumbers, operands);
        expect(!includedNumbers.includes(question.firstNumber) && !includedNumbers.includes(question.secondNumber)).toBeFalsy();
    })

    it("getRandomValue should return a random value included in its parameter array", () => {
        var includedNumbers = [1,2,3,4,6,8,10];
        var value = questionsService.getRandomValue(includedNumbers);
        expect(includedNumbers.includes(value)).toBeTruthy();
    })

    it("It should only return multiplication questions when the operands only have multiplication set to true", () => {
        var numberOfQuestions = 50;
        var includedNumbers = [1,2,3,4,6,8,10];
        var secondaryNumbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
        var operands ={
            multiplication: {
                chance: 1
            },
            division : {
                chance: 0
            }
        };
        var questions = questionsService.generateQuestions(numberOfQuestions, includedNumbers, secondaryNumbers, operands)

        var multiplicationQuestions = 0;

        questions.forEach(question => {
            var isMultiplication = question.method == Methods.Multiplication
            if(isMultiplication) multiplicationQuestions++;
        })

        expect(multiplicationQuestions == numberOfQuestions).toBeTruthy();
    })

    it("It should only return division questions when the operands only have division set to true", () => {
        var numberOfQuestions = 50;
        var includedNumbers = [1,2,3,4,6,8,10];
        var secondaryNumbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
        var operands ={
            multiplication: {
                chance: 0
            },
            division : {
                chance: 1
            }
        };
        var questions = questionsService.generateQuestions(numberOfQuestions, includedNumbers, secondaryNumbers, operands)

        var divisionQuestions = 0;

        console.log(divisionQuestions);

        questions.forEach(question => {
            var isDivision = question.method == Methods.Division
            if(isDivision) divisionQuestions++;
        })

        expect(divisionQuestions == numberOfQuestions).toBeTruthy();
    })

})

