import { SortOrder } from "@/enums/SortOrder";

export type Filter = {
  sort: SortOrder;
  q: string;
};
