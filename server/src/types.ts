import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createUpdootLoader } from "./utils/createVoteStatus";
import { creatorLoader } from "./utils/creatorLoader";

export type MyContext = {
  req: Request & { session: Express.Session };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof creatorLoader> 
  updootLoader: ReturnType<typeof createUpdootLoader>
};
