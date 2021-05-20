export interface Record {
  id: string;
  fields: { Status: "Todo" | "Done" | "In progress"; Name: string };
  createdTime: string;
}
