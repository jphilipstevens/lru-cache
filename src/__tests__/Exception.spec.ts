import { v4 } from "uuid";
import Exception from "../Exception";

describe("Exception", () => {
    it("should create an exception with a code and message", () => {
        const code = v4();
        const message = v4();
        const error = new Exception(code, message);

        expect(error.stack).toBeDefined;
        expect(error.code).toBe(code);
        expect(error.message).toBe(message);
        
    });
    it("should create even if the message is undefined", () => {
        const code = v4();
        const error = new Exception(code);

        expect(error.stack).toBeDefined;
        expect(error.code).toBe(code);
        expect(error.message).toBeUndefined;
        
    });
});