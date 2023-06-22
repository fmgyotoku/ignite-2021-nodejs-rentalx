import { Connection, createConnection, getConnectionOptions } from "typeorm"

export default async (host = 'database_ignite'): Promise<Connection> => {
  const credentials = await getConnectionOptions()

  return createConnection(
    Object.assign(credentials, {
      host
    })
  )
}