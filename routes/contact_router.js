const Router = require('express').Router()
const { contact_controller } = require('../controllers')
const { contact_middleware } = require('../middlewares')

Router.get('/', contact_controller.get_contacts)

Router.get(
  '/:contact_id',
  contact_middleware.id_is_number,
  contact_controller.get_contact_by_id
)

Router.post(
  '/',
  contact_middleware.create_contact,
  contact_controller.create_contact
)

Router.put(
  '/:contact_id',
  contact_middleware.id_is_number,
  contact_controller.update_contact
)

Router.delete('/:contact_id', contact_controller.delete_contact)

module.exports = Router
