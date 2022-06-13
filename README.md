# TodoList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

It is my version of the example in https://www.youtube.com/watch?v=VjlaWksdpWM to familiarize myself with angular and to create my first crud app. The main differences are the following:

- I use ng-boostrap instead of tailwind
- Enhanced the functionallity a little by commiting changes on pressing enter
- Use sometimes a different code structure then in the tutorial

You can experiement with it by using an angular development server or you checkout my github pages deployment.

## Requirements:

- npm 8.5.5
- nodejs v16.15.0

- Install all requirements by executing `$ npm install` from inside the root of this repository. After that, you can use the commands furter down (`ng serve` and `ng build`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deployment on github pages

See https://angular.io/guide/deployment#deploy-to-github-pages

I needed to type the following:
`$ ng build --output-path docs --base-href /angular_todo_app/ && cp docs/index.html docs/404.html`

Make sure to create the `404.html` file in the `/docs` folder to make the github pages deployment work properly.

## Remarks

- Form validation of the length is done with the letter **_m_**, since it is the longest letter while rendering it in the browser (and therefore need to most space in a row)

## Local deployment
+ Tested with ***docker 20.10.14***
+ Build the image: `$ docker build -t todo_test .`
+ Run the image: `$ docker run -d --rm -p 8080:80 todo_test`
