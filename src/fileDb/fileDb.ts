interface INotes {
  id: number;
  title: string;
}

class FileDB {
  private schemas: Record<string, any>;
  private schemaFilePath = "./schema.json";
  constructor() {
    this.schemas = {};
  }
  registerSchema(name: string, schema: any): void {
    this.schemas = { ...this.schemas, [name]: schema };
  }

  getTable(name: string): Table {
    const schema = this.schemas[name];
    return new Table(this.schemaFilePath);
  }
}

export class Table {
  private schemaFilePath;
  private currentSchema;
  constructor(schemaFilePath) {
    this.schemaFilePath = schemaFilePath;
  }
  findAll(): Promise<INotes[]> {
    return Promise.resolve([]);
  }
  findById(): Promise<INotes> {
    return Promise.resolve({ id: 0, title: "" });
  }
  create(newData: INotes): Promise<INotes> {
    return Promise.resolve(newData);
  }
  update(id: number, updatedData: INotes): Promise<INotes> {
    return Promise.resolve(updatedData);
  }
  delete(id: number): Promise<number> {
    return Promise.resolve(id);
  }
}

export default new FileDB();
