const express = require('express')
const router = express.Router()

const {aunthenticateUser} = require('../app/middlewares/authentication')

const usersController = require('../app/controllers/usersController')
const customersController = require('../app/controllers/customersController')
const departmentsController = require('../app/controllers/departmentsController')
const employeesController = require('../app/controllers/employeesController')
const ticketsController = require('../app/controllers/ticketsController')

//Users CRUD

router.post('/users/register',usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', aunthenticateUser, usersController.account)
router.delete('/users/logout', aunthenticateUser, usersController.logout)

// Customers
router.get('/customers',aunthenticateUser,customersController.list)
router.post('/customers',aunthenticateUser,customersController.create)
router.get('/customers/:id',aunthenticateUser,customersController.show)
router.put('/customers/:id',aunthenticateUser,customersController.update)
router.delete('/customers/:id',aunthenticateUser,customersController.destroy)

// put
// delete

// departments
router.get('/departments',aunthenticateUser,departmentsController.list)
router.post('/departments',aunthenticateUser,departmentsController.create)
router.get('/departments/:id',aunthenticateUser,departmentsController.show)
router.put('/departments/:id',aunthenticateUser,departmentsController.update)
router.delete('/departments/:id',aunthenticateUser,departmentsController.destroy)

// employees
router.get('/employees',aunthenticateUser,employeesController.list)
router.post('/employees',aunthenticateUser,employeesController.create)
router.get('/employees/:id',aunthenticateUser,employeesController.show)
router.put('/employees/:id',aunthenticateUser,employeesController.update)
router.delete('/employees/:id',aunthenticateUser,employeesController.destroy)

// tickets
router.get('/tickets',aunthenticateUser,ticketsController.list)
router.post('/tickets',aunthenticateUser,ticketsController.create)
router.get('/tickets/:id',aunthenticateUser,ticketsController.show)
router.put('/tickets/:id',aunthenticateUser,ticketsController.update)
router.delete('/tickets/softDelete/:id',aunthenticateUser,ticketsController.softDelete)
router.delete('/tickets/:id',aunthenticateUser,ticketsController.destroy)

module.exports = router