import AnswersService from "../../src/services/answers.service";
import Methods from "../../src/Methods.enum";

describe("Dimensions Service", () => {
  let answersService;

  beforeAll(() => {
    answersService = new AnswersService();
  });

  it("Check if correct should return true if it is correct, Mulitiplication", () => {
    const isCorrect = answersService.checkIfCorrect(
      45,
      5,
      9,
      Methods.Multiplication
    );
    expect(isCorrect).toBeTruthy();
  });

  it("Check if correct should return false if it is incorrect, Mulitiplication", () => {
    const isCorrect = answersService.checkIfCorrect(
      45,
      3,
      9,
      Methods.Multiplication
    );
    expect(isCorrect).toBeFalsy();
  });

  it("Check if correct should return true if it is correct, Division", () => {
    const isCorrect = answersService.checkIfCorrect(5, 45, 9, Methods.Division);
    expect(isCorrect).toBeTruthy();
  });

  it("Check if correct should return false if it is incorrect, Mulitiplication", () => {
    const isCorrect = answersService.checkIfCorrect(7, 45, 9, Methods.Division);
    expect(isCorrect).toBeFalsy();
  });
});
