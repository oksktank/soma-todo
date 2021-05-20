import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Record } from "../../interfaces";

axios.defaults.baseURL = "https://api.airtable.com/v0/appzidA2Cvu8KFXsK/Todo";
axios.interceptors.request.use(async (config) => {
  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${process.env.AIRTABLE_KEY}`;
  }

  return config;
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
  } else {
    const list = await axios.get("/?maxRecords=3&view=raw");
    try {
      const records: Record[] = list.data.records;
      res.status(200).json({ records: records });
    } catch (e) {
      res.status(500).json({ error: true });
    }
  }
};
