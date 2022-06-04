# Angular 17 Tutorial

## Basics of Angular
+ Angular is a javascript framework that implements a model-view-controller scheme
+ Angular is mostly used in enterprice software
+ It is the most complex modern MVC-framework
+ It uses typescript (A more strongly typed version of javascript)

### Typescript
+ See [](https://github.com/jweber94/Tutorials/tree/master/typescript/intro_project)

### Installation
+ With npm (Nodejs Package Manager)
  - Comes with a nodejs installation
  - `$ npm install -g @angular/cli`
  - Make sure you have nodejs v12.20 or newer installed
+ Start your angular project by createing a new folder and then type
  - `$ ng new my_angular_project`
  - This will ask you a few questions how you want your project to be structured. After it is finished, the angular project is created
    * Go to the folder to inspect this
### Basic Angular Project structure
+ Folder "node_modules":
  - nodejs packages that are needed for the project. Do not touch this folder! It will be managed by `npm` and `ng`
+ `package.json`
  - Defines dependencies and scripts for the development as well as for the case if we want to roll it out
  - Scripts:
    * `ng serve`: Start the development server
    * `ng build`: Transpile project to a deployable version
+ `tsconfig.json`
  - Defines the typescript configuration
  - Settings for the transpiling process in case of the `ng build` execution
+ `src` Folder - Here comes the important part
  - `src/app`: Here are the components stored
    * By default, there is only the root component (called `app-route`)
  - In the source folder is an `index.html`, which has only the `<app-route>` html tag within its body, which is defined by the angular root  component 

+ An angular component is a concatination of a html template and some logic for the template
  - Components are defined by typescript decorators
    * Decorators are like base classes that could be enhanced by out code to implement additional functionallities
    * In the common case, we define a component by using the `Component` decorator from the `@angular/core` library
  - *The `selector` element of a component defines the custom html tag!*

## Example: CRUD app ToDo-List
+ Angular > version 2 gets installed by npm which is a part of nodejs
+  
