"use strict";
// ==========================================
// Jules Playground: Performance & Refactor Test
// ==========================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.legacyCalculateSomethingUnused = exports.combineUserDataAndScores = void 0;
console.log("Starting the application...");
console.log("Loading module A");
console.log("Loading module B");
// ----------------------------------------------------
// [TRAP 1: Performance] An intentionally very slow function O(N^2)
// A perfect target for Jules to optimize using Map/HashMap.
// ----------------------------------------------------
function combineUserDataAndScores(users, scores) {
    const result = [];
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < scores.length; j++) {
            if (users[i].id === scores[j].userId) {
                result.push({
                    ...users[i],
                    score: scores[j].score
                });
            }
        }
    }
    return result;
}
exports.combineUserDataAndScores = combineUserDataAndScores;
// ----------------------------------------------------
// [TRAP 2: Refactoring] Unused/"Dead" code and bad nesting
// Jules should detect this is never used and maybe remove it or refactor it.
// ----------------------------------------------------
function legacyCalculateSomethingUnused(a, b) {
    let temp = 0;
    if (a > 0) {
        if (b > 0) {
            temp = a + b;
            // ... lots of old legacy logic
            console.log("temp value:", temp);
        }
    }
    return temp;
}
exports.legacyCalculateSomethingUnused = legacyCalculateSomethingUnused;
// TODO: write unit tests for 'combineUserDataAndScores' function
