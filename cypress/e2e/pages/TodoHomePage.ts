export const addTodoTask = (name: string) => {
    cy.findByTestId('text-input').should("be.visible").click().type(name, { parseSpecialCharSequences: false }).type('{enter}');
};

export const validateTodoTask = (name: string) => {
  let validated = false;

  cy.findAllByTestId('todo-item-label').as('allTodos');
  return cy.get('@allTodos').each($elem => {
    cy.wrap($elem).invoke('text').then(actualName => {
        if (actualName === name) {
          validated = true;
        }
    });
  }).then(() => {
    return validated;
  });
};

export const editTodoTask = (name: string, edit: string) => {
  cy.findByTestId('todo-item-label').should('have.text', name).dblclick();
  cy.get('div[class="input-container"]').last().children('input').clear().type(edit).type('{enter}');
  
};

export const clickActiveFilter = () => {
  cy.findByText('Active').should('exist').should('have.length', 1)
  .scrollIntoView()
  .click('center');
  cy.url().should('contain','#/active');
};

export const clickCompletedFilter = () => {
  cy.findByText('Completed').should('exist').should('have.length', 1)
  .scrollIntoView()
  .click('center');
  cy.url().should('contain','#/completed');
};

export const markToDoTaskAsCompleted = (name: string) => {
  cy.findAllByTestId("todo-item").each(($elem) => {
    cy.wrap($elem).then(actualName => {
      if (actualName.text() === name) {
        cy.get($elem).children().children('input').click();
      }
  });    

  })
};

export const unselectTodoTask = (name: string) => {
  cy.findAllByTestId("todo-item").each(($elem) => {
    cy.wrap($elem).then(actualName => {
      if (actualName.text() === name) {
        cy.get($elem).children().children('input').click();  
      }
    });    
  })
};

export const removeTodoTask = (name: string) => {
  cy.findAllByTestId("todo-item").each(($elem) => {
    cy.wrap($elem).then(actualName => {
      if (actualName.text() === name) {
        cy.get($elem).trigger('mouseover').then(element=>{
          element.children().children('button').click();
        })
      }
    });    
  })
};

export const getTodoCount = () => {
  return cy.findAllByTestId("todo-item").then((allTodos) => {
    return allTodos.length;      
  })
};

export const clickClearCompleted = () => {
  cy.findByText('Clear completed').should('exist').should('have.length', 1)
  .scrollIntoView()
  .click('center');
};

export const noTodoShouldExist = () => {
  cy.findByTestId("todo-item").should('not.exist');
};

export const selectAllTodoTasks = () => {
  cy.findByTestId('toggle-all').should('exist').should('have.length', 1).click();
};


