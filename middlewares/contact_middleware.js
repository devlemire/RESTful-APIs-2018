module.exports = {
  create_contact: (req, res, next) => {
    const { first_name, last_name, email, company, phone } = req.body

    if (first_name === undefined || first_name.length === 0) {
      return res
        .status(406)
        .send('Request body missing required first_name property')
    }

    if (last_name === undefined || last_name.length === 0) {
      return res
        .status(406)
        .send('Request body missing required last_name property')
    }

    if (email === undefined) {
      req.body.email = null
    }

    if (company === undefined) {
      req.body.company = null
    }

    if (phone === undefined) {
      req.body.phone = null
    }

    next()
  },
  id_is_number: (req, res, next) => {
    const { contact_id } = req.params

    if (isNaN(contact_id)) {
      // contact_id must be a number in order to find a contact
      return res.status(406).send('contact_id is not a Number')
    }

    next()
  }
}
