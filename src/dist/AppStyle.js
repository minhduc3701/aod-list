"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.Wrapper = void 0;
var styled_components_1 = require("styled-components");
exports.Wrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  height: 100vh;\n  flex-direction: column;\n  align-items: center;\n  background-color: ", ";\n  .toggle-wrapper {\n    margin-bottom: 15px;\n    display: flex;\n    .ms-Toggle {\n      margin-right: 10px;\n      .ms-Label {\n        color: ", ";\n      }\n    }\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  height: 100vh;\n  flex-direction: column;\n  align-items: center;\n  background-color: ",
    ";\n  .toggle-wrapper {\n    margin-bottom: 15px;\n    display: flex;\n    .ms-Toggle {\n      margin-right: 10px;\n      .ms-Label {\n        color: ", ";\n      }\n    }\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme === "dark" ? "#333333" : "#ffffff";
}, function (_a) {
    var theme = _a.theme;
    return (theme === "dark" ? "#ffffff" : "#333333");
});
var templateObject_1;
