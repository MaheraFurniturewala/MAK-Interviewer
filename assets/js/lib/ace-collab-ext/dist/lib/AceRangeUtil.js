"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceRangeUtil = void 0;
var ace_builds_1 = require("ace-builds");
/**
 * A helper class for working with Ace Ranges.
 */
var AceRangeUtil = /** @class */ (function () {
    function AceRangeUtil() {
    }
    AceRangeUtil.rangeToJson = function (range) {
        return {
            start: {
                row: range.start.row,
                column: range.start.column
            },
            end: {
                row: range.end.row,
                column: range.end.column
            }
        };
    };
    AceRangeUtil.jsonToRange = function (range) {
        return new ace_builds_1.Range(range.start.row, range.start.column, range.end.row, range.end.column);
    };
    AceRangeUtil.rangesToJson = function (ranges) {
        return ranges.map(function (range) {
            return AceRangeUtil.rangeToJson(range);
        });
    };
    AceRangeUtil.jsonToRanges = function (ranges) {
        return ranges.map(function (range) {
            return AceRangeUtil.jsonToRange(range);
        });
    };
    AceRangeUtil.toJson = function (value) {
        if (Array.isArray(value)) {
            return AceRangeUtil.rangesToJson(value);
        }
        return AceRangeUtil.rangeToJson(value);
    };
    AceRangeUtil.fromJson = function (value) {
        if (Array.isArray(value)) {
            return AceRangeUtil.jsonToRanges(value);
        }
        return AceRangeUtil.jsonToRange(value);
    };
    return AceRangeUtil;
}());
exports.AceRangeUtil = AceRangeUtil;
//# sourceMappingURL=AceRangeUtil.js.map