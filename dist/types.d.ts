export declare type MetricFunction = (a: Array<number>, b: Array<number>) => number;
export declare class HierarchyNode {
    parent: number;
    child: number;
    lambda: number;
    size: number;
    constructor(parent: number, child: number, lambda: number, size: number);
}
export declare type MST = Array<HierarchyNode>;
export declare type SingleLinkage = Array<HierarchyNode>;
export declare type MSTAlgorithm = (input: Array<Array<number>>, minSamples: number, alpha: number, metric: MetricFunction) => SingleLinkage;
export declare type StabilityDict = Map<number, number>;
export interface HdbscanInput {
    input: Array<Array<number>>;
    minClusterSize?: number;
    minSamples?: number;
    alpha?: number;
    metric?: MetricFunction;
    debug?: boolean;
}
export declare class DebugInfo {
    coreDistances?: Array<number>;
    mst?: MST;
    sortedMst?: MST;
    mstBinaryTree?: TreeNode<number>;
    singleLinkage?: SingleLinkage;
    bfsNodes?: Array<number>;
    condensedTree?: SingleLinkage;
    clusterNodes?: Array<number>;
    clusterNodesMap?: Map<number, number>;
    revClusterNodesMap?: Map<number, number>;
    clusterTree?: SingleLinkage;
    labeledInputs?: Array<number>;
    clusters?: Array<Array<number>>;
    noise?: Array<number>;
    constructor();
}
export declare class TreeNode<T> {
    left?: TreeNode<T>;
    right?: TreeNode<T>;
    data: T;
    parent?: TreeNode<T>;
    constructor(data: T);
    getAncestor(): TreeNode<T>;
}
