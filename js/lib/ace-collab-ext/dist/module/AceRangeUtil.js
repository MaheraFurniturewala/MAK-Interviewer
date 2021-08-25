import { Range } from "ace-builds";
/**
 * A helper class for working with Ace Ranges.
 */
export class AceRangeUtil {
    static rangeToJson(range) {
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
    }
    static jsonToRange(range) {
        return new Range(range.start.row, range.start.column, range.end.row, range.end.column);
    }
    static rangesToJson(ranges) {
        return ranges.map((range) => {
            return AceRangeUtil.rangeToJson(range);
        });
    }
    static jsonToRanges(ranges) {
        return ranges.map((range) => {
            return AceRangeUtil.jsonToRange(range);
        });
    }
    static toJson(value) {
        if (Array.isArray(value)) {
            return AceRangeUtil.rangesToJson(value);
        }
        return AceRangeUtil.rangeToJson(value);
    }
    static fromJson(value) {
        if (Array.isArray(value)) {
            return AceRangeUtil.jsonToRanges(value);
        }
        return AceRangeUtil.jsonToRange(value);
    }
}
//# sourceMappingURL=AceRangeUtil.js.map