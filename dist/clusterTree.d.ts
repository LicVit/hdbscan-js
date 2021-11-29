import { HierarchyNode, SingleLinkage, StabilityDict } from "./types";
export declare function bfsFromHierarchy(hierarchy: SingleLinkage, root: number): number[];
export declare function condenseTree(hierarchy: SingleLinkage, minClusterSize: number): {
    bfsNodes: number[];
    condensedTree: SingleLinkage;
};
export declare function computeStabilities(condensedTree: SingleLinkage): Map<number, number>;
export declare function bfsFromClusterTree(tree: SingleLinkage, bfsRoot: number): number[];
export declare function getClusterNodes(condensedTree: SingleLinkage, stability: StabilityDict, clusterSelectionMethod?: string, allowSingleCluster?: boolean, clusterSelectionEpsilon?: number, maxClusterSize?: number): {
    clusterNodes: number[];
    clusterNodesMap: Map<number, number>;
    revClusterNodesMap: Map<number, number>;
    clusterTree: HierarchyNode[];
};
export declare function labelClusters(condensedTree: SingleLinkage, clusterNodes: number[], clusterLabelMap: Map<number, number>, allowSingleCluster?: boolean, clusterSelectionEpsilon?: number, matchReferenceImplementation?: boolean): Array<number>;
export declare function getClustersAndNoise(labels: Array<number>): {
    clusters: number[][];
    noise: number[];
};
