import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host, //database_ignite Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    })
  )
}