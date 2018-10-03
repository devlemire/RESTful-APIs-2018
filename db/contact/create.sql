INSERT INTO contact (first_name, last_name, email, company, phone) VALUES (
  ${first_name},
  ${last_name},
  ${email},
  ${company},
  ${phone}
) RETURNING *;