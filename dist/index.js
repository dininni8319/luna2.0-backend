"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send("<h1>Typescript works!!!!!</h1>");
});
app.listen(4321, () => {
    console.log("🚀 ~ file: index.js:14 ~ app.listen ~ port:", 4321);
});
