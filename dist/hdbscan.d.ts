import { DebugInfo, HdbscanInput } from './types';
export declare class Hdbscan {
    private input;
    private minClusterSize;
    private minSamples;
    private alpha;
    private metric;
    private debug;
    private debugInfo?;
    private clusters;
    private noise;
    constructor({ input, minClusterSize, minSamples, alpha, metric, debug }: HdbscanInput);
    getDebugInfo(): DebugInfo | undefined;
    getClusters(): number[][];
    getNoise(): number[];
}
