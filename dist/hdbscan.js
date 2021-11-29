"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hdbscan = void 0;
const clusterTree_1 = require("./clusterTree");
const kdTreePrim_1 = __importDefault(require("./kdTreePrim"));
const metrics_1 = require("./metrics");
const mst_1 = require("./mst");
class Hdbscan {
    constructor({ input, minClusterSize = 5, minSamples = 5, alpha = 1.0, metric = metrics_1.euclidean, debug = false }) {
        this.input = input;
        this.minClusterSize = minClusterSize;
        this.minSamples = minSamples;
        this.alpha = alpha;
        this.metric = metric;
        this.debug = debug;
        let debugInfo;
        try {
            // Build the cluster hierarchy using kdTree and Prim
            const { coreDistances, mst, sortedMst, singleLinkage } = (0, kdTreePrim_1.default)(this.input, this.minSamples, this.alpha, this.metric);
            if (this.debug) {
                const mstBinaryTree = (0, mst_1.mstToBinaryTree)(sortedMst);
                debugInfo = { coreDistances, mst, sortedMst, mstBinaryTree, singleLinkage };
            }
            // Condense the cluster tree
            const { bfsNodes, condensedTree } = (0, clusterTree_1.condenseTree)(singleLinkage, this.minClusterSize);
            if (this.debug) {
                debugInfo = Object.assign(Object.assign({}, debugInfo), { bfsNodes, condensedTree });
            }
            // Compute stabilities of condensed clusters
            const stabilityDict = (0, clusterTree_1.computeStabilities)(condensedTree);
            if (this.debug) {
                debugInfo = Object.assign(Object.assign({}, debugInfo), { condensedTree });
            }
            // Extract the clusters
            const { clusterNodes, clusterNodesMap, revClusterNodesMap, clusterTree } = (0, clusterTree_1.getClusterNodes)(condensedTree, stabilityDict);
            if (this.debug) {
                debugInfo = Object.assign(Object.assign({}, debugInfo), { clusterNodes, clusterNodesMap, revClusterNodesMap, clusterTree });
            }
            // Label the inputs
            const labeledInputs = (0, clusterTree_1.labelClusters)(condensedTree, clusterNodes, clusterNodesMap);
            if (this.debug) {
                debugInfo = Object.assign(Object.assign({}, debugInfo), { labeledInputs });
            }
            // Get array of clusters and noise from labels
            const { clusters, noise } = (0, clusterTree_1.getClustersAndNoise)(labeledInputs);
            if (this.debug) {
                debugInfo = Object.assign(Object.assign({}, debugInfo), { clusters, noise });
                console.debug('debugInfo: ', debugInfo);
            }
            this.debugInfo = debugInfo;
            this.clusters = clusters;
            this.noise = noise;
        }
        catch (e) {
            if (this.debug) {
                console.debug('debugInfo: ', debugInfo);
                console.error('Error: Hdbscan: ', e);
            }
            throw e;
        }
    }
    getDebugInfo() {
        return this.debugInfo;
    }
    getClusters() {
        return this.clusters;
    }
    getNoise() {
        return this.noise;
    }
}
exports.Hdbscan = Hdbscan;
