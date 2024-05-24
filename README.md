# Cypress Testing Framework

### Highlights of the framework

    1. Tool Used: Cypress
    2. Scripting: Typescript
    3. Design Pattern: POM (Page Object Model)
    4. Basic Regression tests are considered for automation (due to limited functionality and problem scope)
    5. Execution capability added to execute tests on chrome, firefox, edge and electron (default)
    6. Reporting: mochawesome (folder- ./mochawesome-report/results.html)
    7. CI/CD: Not covered due to time limitation and out of problem scope
    8. Execution Video - cypress/videos/*.mp4 
    9. Tests can be executed on Windows and Mac but not sure about Linux(not tested)
    10. Can be executed on different browsers like chrome, firefox, edge and electron


### Test Cases covered
    Positive tests-
        1. Validate Newly added tasks default to Active todo task
        2. Edit a todo task
        3. Mark To do task as completed and validate it
        4. Remove To do task
        5. To do with same names should be allowed to create

    Negative tests (Not much scope due to limited functionality)-
        1. Clear Completed only removes To do which marked as Completed
        2. Marking To do task as completed on Active filter should remove from Active filter
        3. Unchecking To do tasks on Completed filter should remove and add to Active filter
        4. Special characters when entered are saved as different characters in To do names


### Limitations

    1. Parallel execution cannot be done
    2. CI/CD is not configured.

### Improvement

    1. Data fetching can be improved but currently cypress basic fixtures is used.
    2. Further reporting improvement can be done but basic reporting is included


### Configuration (Steps to install and execute)

### Step 1: Prerequisites installation

1. Install JDK 17 or higher

2. Install Nodejs v21.7.1 (I used) or higher(https://nodejs.org/en/download/)

3. Install Visual Studio/IntelliJ Idea if you need IDE

4. Install git and git client if needed

5. Install latest Chrome or firefox browser

### Step 2: Repository clone and setup dependencies

```
$ git clone https://github.com/tushki225/wl_cypress_typescript.git
$ cd wl_cypress_typescript
$ npm install
```

### Step 3: Execute tests on local machine

Two ways to execute tests (From repository folder)

1. Script that will open cypress app and then choose the spec to execute:

    $ npm run cy:open

2. Script that will be executed from command line:

    $ npm run test:chrome    (For chrome)

    $ npm run test:firefox   (For firefox)

    $ npm run test:edge      (For edge)
    
    $ npm run test:electron  (For electron)
