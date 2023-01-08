# Starwars, an Angular coding test project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

## Command overview

| Command            | Description                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `npm run start`    | Starts the project up on `http://localhost:4200`. The application will automatically reload if you change any of the source files. |
| `npm run build`    | Builds the project. The build artifacts will be stored in the `dist/` directory.                                                   |
| `npm run test`     | Runs all unit tests in the project.                                                                                                |
| `npm run e2e`      | Runs Cypress end-to-end tests in headless mode. Good for CI/CD                                                                     |
| `npm run e2e-open` | Opens Cypress so you can execute end-to-end tests                                                                                  |

## Starting on a fresh machine?

If you just downloaded this repository from the beginning, and need to install these prerequisites:

1. Download and install the latest LTS [NodeJS and NPM](https://nodejs.org/en/download) version
2. Angular CLI - `npm install -g @angular/cli` to install this globally on your machine
3. Run the command `npm install` inside this folder to install all dependencies
4. Now you should be ready to start the project using `npm run start`, and then see it on `http://localhost:4200`

## What does this project contain

This project is meant as a coding test project, with some features required by company that requested it. Without uploading the project description itself, here is the list of features that have been added on top of a standard v.15 Angular project:

- No NgModules are used, apart from the built-in app.module.ts file
- All components used are standalone components
- State management is handled using NgRx, using the new [Component Store](https://ngrx.io/guide/component-store) setup
- The unit test framework runs on Jest rather than Karma+Jasmine
- E2E testing is running using Cypress
- Responsiveness is achieved using @media queries, just for the sake of ease and without going too much overboard with newer CSS functionalities
