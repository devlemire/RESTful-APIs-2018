module.exports = {
  create_contact: async (req, res) => {
    try {
      // Get the db instance
      const db = req.app.get('db')
      // Create a new contact
      const [new_contact] = await db.contact.create(req.body)

      // Send the new contact to the client
      res.send(new_contact)
    } catch (err) {
      console.error('create_contact failed in contact_controller.js.', err)
      res
        .status(500)
        .send(`create_contact failed in contact_controller.js. ${err}`)
    }
  },
  get_contacts: async (req, res) => {
    try {
      // Get the db instance
      const db = req.app.get('db')
      // Get the all the contacts
      const contacts = await db.contact.get_all()

      // Send all the contacts to the client
      res.send(contacts)
    } catch (err) {
      console.error('get_contacts failed in contact_controller.js.', err)
      res
        .status(500)
        .send(`get_contacts failed in contact_controller.js. ${err}`)
    }
  },
  get_contact_by_id: async (req, res) => {
    try {
      // Get the db instance
      const db = req.app.get('db')
      // Get the contact_id from the request parameters
      const { contact_id } = req.params
      // Get a contact by contact_id
      const [contact] = await db.contact.get_by_id({ contact_id })

      // Either send the contact or a helpful "error" message back to the client
      res.send(
        contact !== undefined ? contact : 'No contact found by the given id.'
      )
    } catch (err) {
      console.error('get_contact_by_id failed in contact_controller.js.', err)
      res
        .status(500)
        .send(`get_contact_by_id failed in contact_controller.js. ${err}`)
    }
  },
  update_contact: async (req, res) => {
    try {
      // Get the db instance
      const db = req.app.get('db')
      // Get the contact_id from the request parameters
      const { contact_id } = req.params
      // Get the first_name, last_name, email, company, and phone
      // from the request body
      const { first_name, last_name, email, company, phone } = req.body
      // Get the contact by contact_id
      const [contact] = await db.contact.get_by_id({ contact_id })

      if (typeof contact === undefined) {
        // There was no contact found by the given contact_id
        // Send a 406 (unacceptable) error code to the client
        return res
          .status(406)
          .send(`Contact with an id of ${contact_id} does not exist.`)
      }

      // Update the contact by contact_id using given values or
      // pre-existing values
      const [updated_contact] = await db.contact.update_by_id({
        contact_id,
        first_name: first_name || contact.first_name,
        last_name: last_name || contact.last_name,
        email: email || contact.email,
        company: company || contact.company,
        phone: phone || contact.phone
      })

      // Send the updated contact back to the client
      res.send(updated_contact)
    } catch (err) {
      console.error('update_contact failed in contact_controller.js.', err)
      res
        .status(500)
        .send(`update_contact failed in contact_controller.js. ${err}`)
    }
  },
  delete_contact: async (req, res) => {
    try {
      // Get the db instance
      const db = req.app.get('db')
      // Get the contact_id from the request parameters
      const { contact_id } = req.params

      // Delete the contact by contact_id
      // If the contact_id doesn't exist nothing will happen
      await db.contact.delete_by_id({ contact_id })

      // Send a 204 (no content) status code back to the client
      res.sendStatus(204)
    } catch (err) {
      console.error('delete_contact failed in contact_controller.js.', err)
      res
        .status(500)
        .send(`delete_contact failed in contact_controller.js. ${err}`)
    }
  }
}
