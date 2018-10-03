UPDATE contact SET
first_name = ${first_name},
last_name = ${last_name},
email = ${email},
company = ${company},
phone = ${phone}
WHERE contact_id = ${contact_id}
RETURNING *;