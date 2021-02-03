"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../");
test("it should add two numbers", function () {
    var result = __1.add(1, 1);
    expect(result).toBe(2);
});
test("it should add two negative numbers", function () {
    var result = __1.add(1, -1);
    expect(result).toBe(0);
});
