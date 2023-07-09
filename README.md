# E-Commerce Backend

![License](https://img.shields.io/badge/License-MIT%20License-brightgreen)

## Description

My motivation behind building this tool was to implement what we have learned with ORM this week in class. This backend tool can be used for e-commerce businesses to keep track of all their products.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)

## Installation

To be able to use this tool, simply clone the repo from https://github.com/SixFourDev/e-commerce-backend, then open it in VS Code.  After you have opened it in VS Code, open your terminal in VS Code by right clicking "server.js" then click "Open in Integrated Terminal". The terminal will then present itself at the bottom of VS Code. Since this tool uses several dependencies, you will need to run "npm install" to install the packages needed to be able to use this tool. Then in your terminal your going to want to import the schema, so type "mysql -u root -p", and we're going to source the schema with "SOURCE db/schema.sql". After it has been source type "quit;" to get out of mysql, then you will need to run "npm run seed".

## Usage

After you have went through the installation, you will run "npm run start" in your terminal, and it will say "App listening on port 3001!". You will then open Insomnia/Postman so we can test the app. In Insomnia, we can make get, post, put, and delete requests. The api endpoints you can search are "/api/categories/", "/api/categories/:id", "/api/tags", "/api/tags/:id", "/api/products", and "/api/products/:id".

## License

MIT License

## Tests

<img width="1503" alt="Screen Shot 2023-07-09 at 2 41 55 PM" src="https://github.com/SixFourDev/e-commerce-backend/assets/127274865/011b550a-2b0f-44f4-bd48-770a5120ee0a">

<img width="1503" alt="Screen Shot 2023-07-09 at 2 42 19 PM" src="https://github.com/SixFourDev/e-commerce-backend/assets/127274865/d832f872-d4c3-4eb5-b0f1-aca1acdb920d">

<img width="1503" alt="Screen Shot 2023-07-09 at 2 42 47 PM" src="https://github.com/SixFourDev/e-commerce-backend/assets/127274865/00b8037f-5376-4959-acc2-26d626cf16aa">

<img width="1503" alt="Screen Shot 2023-07-09 at 2 43 04 PM" src="https://github.com/SixFourDev/e-commerce-backend/assets/127274865/73cecc63-233c-47c5-916e-c84e6577bc09">

## Questions

For any questions or inquiries, feel free to reach out to me:

- GitHub: [SixFourDev](https://github.com/SixFourDev)
- Email: sb_94@yahoo.com

