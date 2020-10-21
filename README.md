## Project Goals

The project has been completed into two separate parts containing a front-end [project live server](https://project-freelance.netlify.app/) and a separate API back-end [github link](https://work-order-backend.herokuapp.com/tradesmen), [server link](https://github.com/clay099/work-order-backend) .

The project is a peer-to-peer outsourcing program which matches general users with qualified tradesmen to complete real-world jobs. At a high level there will be two types of users who will utilize this project. General Users & Tradesmen

General Users will be anyone who needs to have a job completed which they need assistance completing. This can be anything from mowing their lawn, painting their house to a Bathroom renovation.

Tradesmen will be people who are able to provide their expertise to help their parties complete their projects.

## Project Demo

### User Sign Up & Create New Project

![User Sign Up & Create New Project](demo\SignUp&NewProject.gif)

### Tradesmen Sign In & Project Bid

![Tradesmen Sign In & Project Bid](demo\TradesmenProcess.gif)

### User Accept Bid, Mark As Complete & Provide Project Review

![User Accept Bid, Mark As Complete & Provide Project Review](demo\UserProjectProcess.gif)

## Project Functionality

The user experience is broken up into two parts. One for the general users and one for tradesmen. To gain the best understanding of the functionality as some processes can only be completed by general users or tradesmen, it is suggested that you many need to log out as a user and login as a tradesmen multiple times.

As the project uses a local storage, if you wish to login as a general user and tradesmen at the same time on one computer please use chrome's incognito mode or another browsers private mode to avoid saving to local storage.

### User functionality:

-   Register a new profile
-   Update their profile information
-   Create a new project to be completed
-   Review and select a winning bid from quotes provided by tradesmen
-   Cancel / Delete a project
-   Mark a Project as Complete
-   Provide tradesmen feedback & node project issues

### Tradesmen functionality:

Register a new tradesmen profile

-   Update their profile information
-   Review projects which are at an bid stage & provide a project bid if they choose
-   If no bids have been selected tradesmen can update their project bid (tradesmen are only able to submit one bid per project)
-   Review project status and any feedback / reviews the general user has provided
-   Review all projects they are associated with

## Project Data

As this project is designed to be a peer-to-peer platform there is no external third party database to connect to. As outlined above a separate back-end API has been designed for this project and the front-end connects to this back-end API.

The project is seeded with limited general users & tradesmen data to allow for testing of the platform without needing to create all data from scratch.

To login in as a General User or Tradesmen please use the following credentials or feel free to register your own user:

-   Email: "user@gmail.com" or "tradesmen@gmail.com"
-   Password: "password"

## Major Technologies Incorporated

-   React - front-end user interface
-   React-Redux - predictable state container
-   Redux-Persist - allows for Redux state to be stored an persisted through hard refreshes using local-storage
-   Redux-Thunk - middleware to allow for async operations (API call's to back-end)
-   React-Router-DOM - front-end routing
-   Axios - HTTP client
-   Material-UI - Pre-made User Interface React Components
-   Jest & React Testing Library - Test runner

## Sensitive Information

As many users will have work completed at their address both their names and addresses are considered sensitive information.

When tradesman bid on a project they will only be able to see the city, ZIP and country (they will not see the exact address). The project address will only be provided to the winner of the marketplace bid so they can complete the project.

### Sensitive functionality which is not implemented:

-   User ID verification - avoid duplicate users
-   Tradesmen ID verification - avoid badly rated tradesmen creating a new identification to start again
-   Fake project completion - avoid tradesmen creating users and acting as if they have completed projects

## Project Stretch Goals

-   Add further user interface functionality to allow for a seamless user experience. Things to implement include:

    -   Front-end form validation & feedback (feedback currently occurs via snackbar component)
    -   Add Tooltips (hover identifying elements)
    -   Add ability to add user/tradesmen photos

-   Add ability to add project before & after photos (back-end API set up)
-   Add instance chat function between end user and tradesmen (back-end API set up)

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
