import {expect} from "code";
import {decode} from "../../app/modules"

describe("decode", () => {
    test("should return [['*'], ['*'], ['8'], ['0']]", () => {
        const elements = "* * 8 0";
        const result = decode(elements);

        expect(result).to.be.equal([["*"], ["*"], ["8"], ["0"]]);
    });

    test("should return [['*'],['*'], ['9', '16'], ['0']]", () => {
        const elements = "* * 9,16 0";
        const result = decode(elements);

        expect(result).to.be.equal([["*"],["*"], ["9", "16"], ["0"]]);
    });

    test("should return [['1', '15'], ['*'], ['0'], ['0']]", () => {
        const elements = "1,15 * 0 0";
        const result = decode(elements);

        expect(result).to.be.equal([["1", "15"], ["*"], ["0"], ["0"]]);
    });

    test("should return [['*'], ['1','2','3','4','5'], ['10','18'], ['0']]", () => {
        const elements = "* 1,2,3,4,5 10,18 0";
        const result = decode(elements);

        expect(result).to.be.equal([["*"], ["1","2","3","4","5"], ["10","18"], ["0"]]);
    });

    test("should return [['*'], ['*'], ['*'], ['0','30']]", () => {
        const elements = "* * * 0,30";
        const result = decode(elements);

        expect(result).to.be.equal([["*"], ["*"], ["*"], ["0","30"]])
    });
});