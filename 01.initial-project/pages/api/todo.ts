import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Record } from "../../interfaces";

//TODO 본인 airtable 계정 url로 수정
axios.defaults.baseURL = "https://api.airtable.com/v0/appzidA2Cvu8KFXsK/Todo";
axios.interceptors.request.use(async (config) => {
  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${process.env.AIRTABLE_KEY}`;
  }
  config.headers["Content-Type"] = "application/json";

  return config;
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const post = await axios.post("/", {
        records: [req.body],
      });
      res.status(200).json({ success: true, data: post.data });
    } else {
      const list = await axios.get("/?maxRecords=100&view=raw");

      const records: Record[] = list.data.records;
      res.status(200).json({ records: records });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: true });
  }
};
