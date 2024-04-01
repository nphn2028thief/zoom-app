import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export interface IParams extends Params {
  id: string;
}
