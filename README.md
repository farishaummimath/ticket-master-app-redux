# Ticket Master Application

Ticket Master is a full stack web application built on MERN(Mongo Express ReactJS and NodeJS) Stack that allows users to manage customers , employees and ticket data.

## Features
    * Create,Update and manage customer information 
    * Create,Update and manage employee and departments information 
    * Manage tickets of customers and assign to different employees and department
    * Reports of tickets and releated information
    * Emails are sent to customer once the ticket is generated and after the ticket is resolved.


## Dependencies and Installation
* Backend
    
    ```bash
        npm install express mongoose cors brcyptjs jsonwebtoken cors concurrently
    ```
    For sending emails

    ```bash
        npm install nodemailer
    ```
    For validation

    ```bash
        npm install validator
    ```

* FrontEnd
    
    * built using create-react-app
    * react-router-dom and axios

        ```bash
             npm install react-router-dom axios 
        ```
    * styled using React Bootstrap 4 components : [Reactstrap](https://reactstrap.github.io/)
    
    

