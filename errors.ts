import { CustomError } from "./deps.ts";

export type NotSupported<Thing extends string = ""> = CustomError<
  `${Thing} is not supported`
>;
export type Failure<Reason extends string = ""> = CustomError<
  `Failed because ${Reason}`
>;
