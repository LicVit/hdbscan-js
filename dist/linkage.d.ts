import { MST, SingleLinkage } from "./types";
export declare function buildSingleLinkage(mst: MST, sorted?: boolean): {
    sortedMst: MST;
    singleLinkage: SingleLinkage;
};
