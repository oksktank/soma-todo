import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
  } else {
    res.status(200).json({ name: "Hello, World" });
  }
};
