"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = void 0;
var url = process.env.NODE.ENV === 'production' ? 'https://draw-and-guess-backend.herokuapp.com' : 'http://localhost:8000';
exports.url = url;