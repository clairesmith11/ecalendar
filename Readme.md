# eCalendar

## Overview

An events calendar app built with React, Node/Express and MongoDb. This app was created for the Chingu Voyage 30 prework.

[Live Link](https://ecalendar-2021.herokuapp.com/)

## Features

- The app accurately displays a scrollable calendar which can display months from the past or future. It determines and marks the current day.
- The app allows a user to add an event with a title, date, time and location.
- The user's events are saved to a database for persistence.
- The user can edit or delete an existing event.

## Dependencies

This project is bootstrapped with Create-React-App.
Additional packages include:

- [date-fns](https://date-fns.org/): A modern JavaScript date utility library
- [React-Bootstrap](https://react-bootstrap.github.io/): A CSS component library for React
- [fontawesome](https://fontawesome.com): A font icon library
- [axios](https://www.npmjs.com/package/axios): A promise-based HTTP client for node.js

## Running this project locally

1. Clone this project
2. Run `npm install` in your terminal
3. From the root folder, run `npm run dev` to launch development server (backend)
4. From the root folder, run `npm run client` to launch development client (frontend)
