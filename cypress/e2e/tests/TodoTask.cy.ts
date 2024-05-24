import { first } from "cypress/types/lodash";
import {
  addTodoTask,
  clickActiveFilter,
  clickClearCompleted,
  clickCompletedFilter,
  editTodoTask,
  getTodoCount,
  markToDoTaskAsCompleted,
  removeTodoTask,
  selectAllTodoTasks,
  unselectTodoTask,
  validateTodoTask,
} from "../pages/TodoHomePage";

describe("WL - To do Task Regression", () => {

  let todoName : [], special : [];;
  
  let editName:string;
  beforeEach(() => {
    //Get input data from fixtures
    cy.fixture("data.json").then((input) => {
        cy.visit(input.url);
        //Verify Page title
        cy.title().should("eq", input.homePageTitle).wait(1000);
        todoName=input.addTodo
        editName= input.editName;
        special = input.specialCharacters;
    });
  });
  
  // Positive tests starts here
  it("Validate Newly added tasks default to Active todo task", () => {
    addTodoTask(todoName['first']);
    addTodoTask(todoName['second']);
    addTodoTask(todoName['third']);

    clickActiveFilter();

    validateTodoTask(todoName['first']).then(result => {
      expect(result).to.be.true;
    });
    validateTodoTask(todoName['second']).then(result => {
      expect(result).to.be.true;
    });
    validateTodoTask(todoName['third']).then(result => {
      expect(result).to.be.true;
    });
  });

  it("Edit a todo task", () => {
    addTodoTask(todoName['first']);
    validateTodoTask(todoName['first']).then(result => {
      expect(result).to.be.true;
    });

    editTodoTask(todoName['first'], editName);  
    validateTodoTask(editName).then(result => {
      expect(result).to.be.true;
    });
  });

  it("Mark To do task as completed and validate it", () => {
    addTodoTask(todoName['first']);
    addTodoTask(todoName['second']);

    markToDoTaskAsCompleted(todoName['first']);
    clickCompletedFilter();

    validateTodoTask(todoName['first']).then(result => {
      expect(result).to.be.true;
    });

    validateTodoTask(todoName['second']).then(result => {
      expect(result).to.be.false;
    });
  });

  it("Remove To do task", () => {
    addTodoTask(todoName['first']);
    addTodoTask(todoName['second']);

    validateTodoTask(todoName['first']).then(result => {
      expect(result).to.be.true;
    });

    validateTodoTask(todoName['second']).then(result => {
      expect(result).to.be.true;
    });

    removeTodoTask(todoName['first']);
    // removeTodoTask(todoName['second']);

    validateTodoTask(todoName['first']).then(result => {
      expect(result).to.be.false;
    });

    validateTodoTask(todoName['second']).then(result => {
      expect(result).to.be.true;
    });
  });

  it("To do with same names should be allowed to create", () => {
    addTodoTask(todoName['first']);
    addTodoTask(todoName['first']);

    getTodoCount().then(count=>{
      expect(count).to.be.eq(2);  
    });
    
  });

  //Negative tests starts here

  it("Clear Completed only removes To do which marked as Completed", () => {
    addTodoTask(todoName['first']);
    addTodoTask(todoName['second']);

    getTodoCount().then(count=>{
      expect(count).to.be.eq(2);  
    });

    markToDoTaskAsCompleted(todoName['first']);

    clickClearCompleted();
    getTodoCount().then(count=>{
      expect(count).to.be.eq(1);  
    })
    
  });

  it("Marking To do task as completed on Active filter should remove from Active filter", () => {
    addTodoTask(todoName['first']);
    addTodoTask(todoName['second']);

    clickActiveFilter();

    getTodoCount().then(count=>{
      expect(count).to.be.eq(2);  
    });

    markToDoTaskAsCompleted(todoName['first']);

    getTodoCount().then(count=>{
      expect(count).to.be.eq(1);  
    });

    clickCompletedFilter();

    getTodoCount().then(count=>{
      expect(count).to.be.eq(1);  
    });
    
  });

  it("Unchecking To do tasks on Completed filter should remove and add to Active filter", () => {
    addTodoTask(todoName['first']);
    addTodoTask(todoName['second']);
    addTodoTask(todoName['third']);

    selectAllTodoTasks();

    getTodoCount().then(count=>{
      expect(count).to.be.eq(3);  
    });

    clickCompletedFilter();
    getTodoCount().then(count=>{
      expect(count).to.be.eq(3);  
    });

    unselectTodoTask(todoName['second']);

    getTodoCount().then(count=>{
      expect(count).to.be.eq(2);  
    });

    clickActiveFilter();

    getTodoCount().then(count=>{
      expect(count).to.be.eq(1);  
    });

    validateTodoTask(todoName['second']);
    
  });

  it("Special characters when entered are saved as different characters in To do names", () => {
    addTodoTask(special['input']);
    getTodoCount().then(count=>{
      expect(count).to.be.eq(1);  
    });
    validateTodoTask(special['output']).then(result => {
      expect(result).to.be.true;
    });
    
  });

});
