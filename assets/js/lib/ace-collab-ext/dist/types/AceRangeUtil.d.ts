import { Ace } from "ace-builds";
export interface IRangeData {
    start: {
        row: number;
        column: number;
    };
    end: {
        row: number;
        column: number;
    };
}
/**
 * A helper class for working with Ace Ranges.
 */
export declare class AceRangeUtil {
    static rangeToJson(range: Ace.Range): IRangeData;
    static jsonToRange(range: IRangeData): Ace.Range;
    static rangesToJson(ranges: Ace.Range[]): IRangeData[];
    static jsonToRanges(ranges: IRangeData[]): Ace.Range[];
    static toJson(value: Ace.Range): IRangeData;
    static toJson(value: Ace.Range[]): IRangeData[];
    static fromJson(value: IRangeData): Ace.Range;
    static fromJson(value: IRangeData[]): Ace.Range[];
}
