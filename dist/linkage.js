"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSingleLinkage = void 0;
const mst_1 = require("./mst");
const types_1 = require("./types");
const unionFind_1 = require("./unionFind");
function createSingleLinkage(sortedMst) {
    const result = new Array(sortedMst.length);
    var forest = new unionFind_1.UnionFind(sortedMst.length + 1);
    for (var i = 0; i < sortedMst.length; ++i) {
        const parent = sortedMst[i].parent;
        const child = sortedMst[i].child;
        const weight = sortedMst[i].lambda;
        const parentF = forest.fastFind(parent);
        const childF = forest.fastFind(child);
        const sizeF = forest.sizeOf(parentF) + forest.sizeOf(childF);
        result[i] = new types_1.HierarchyNode(parentF, childF, weight, sizeF);
        forest.union(parentF, childF);
    }
    return result;
}
function buildSingleLinkage(mst, sorted = false) {
    var sortedMst = mst;
    if (!sorted) {
        sortedMst = (0, mst_1.sortMst)(mst);
    }
    const singleLinkage = createSingleLinkage(sortedMst);
    return { sortedMst, singleLinkage };
}
exports.buildSingleLinkage = buildSingleLinkage;
