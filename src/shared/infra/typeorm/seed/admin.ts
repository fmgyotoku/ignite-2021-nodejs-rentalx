import createConnection from "../index"
import { v4 as uudiv4 } from "uuid"
import { hash } from "bcrypt"

async function create() {
  const connection = await createConnection("localhost")

  const id = uudiv4()
  const password = await hash("admin", 8)

  try {
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
      values ('${id}', 'admin', 'admin@rentx.com.au', '${password}', true, now(), 'ABC-123')`
    )
  } finally {
    connection.close
  }
}

create().then(() => console.log('User admin created!'))