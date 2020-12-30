import { getConnectionOptions, createConnection, Connection } from 'typeorm';

const db = async (
  optionOverrides: Record<string, any> = {}
): Promise<Connection> => {
  try {
    const connectionOptions = await getConnectionOptions();
    return await createConnection({
      ...connectionOptions,
      ...optionOverrides,
    });
  } catch (error) {
    throw error;
  }
};

export default db;
