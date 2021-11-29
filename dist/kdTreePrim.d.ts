import { MetricFunction } from "./types";
export default function kdTreePrim(input: Array<Array<number>>, minSamples: number, alpha: number, metric: MetricFunction): {
    coreDistances: number[];
    mst: import("./types").MST;
    sortedMst: import("./types").MST;
    singleLinkage: import("./types").SingleLinkage;
};
