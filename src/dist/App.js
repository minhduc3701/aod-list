"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var Toggle_1 = require("aod-dependencies/Toggle");
var icons_1 = require("aod-dependencies/@uifabric/icons");
var AppStyle_1 = require("./AppStyle");
var ListCustom_1 = require("aod-dependencies/ListCustom");
var icons_2 = require("aod-dependencies/@uifabric/icons");
var axios_1 = require("axios");
icons_1.initializeIcons();
var defaultColumns = [
    {
        key: "column1",
        name: "Name",
        fieldName: "name",
        minWidth: 70,
        maxWidth: 400,
        priority: 1,
        data: "string",
        onRender: function (item) {
            return (react_1["default"].createElement("div", { className: "name-col" },
                react_1["default"].createElement("span", null, item.name)));
        }
    },
    {
        key: "column2",
        name: "Date Modified",
        fieldName: "dateModified",
        minWidth: 70,
        maxWidth: 250,
        priority: 3,
        data: "date",
        onRender: function (item) {
            var option = {
                year: "numeric",
                month: "short",
                day: "2-digit"
            };
            return (react_1["default"].createElement("span", null, item.dateModified
                .toLocaleDateString("en-US", option)
                .replace(",", "")));
        },
        isPadded: true
    },
    {
        key: "column3",
        name: "Modified By",
        fieldName: "modifiedBy",
        minWidth: 70,
        maxWidth: 250,
        priority: 4,
        data: "string",
        onRender: function (item) {
            return react_1["default"].createElement("span", null, item.modifiedBy);
        }
    },
    {
        key: "column4",
        name: "Sharing",
        fieldName: "sharingBy",
        minWidth: 70,
        maxWidth: 250,
        data: "string",
        priority: 2,
        onRender: function (item) {
            return (react_1["default"].createElement("div", null,
                item.sharingBy && (react_1["default"].createElement(icons_2.Icon, { iconName: "People", style: { width: "12px", height: "12px", paddingRight: "8px" } })),
                react_1["default"].createElement("span", null, item.sharingBy)));
        }
    },
    {
        key: "column5",
        name: "File Size",
        fieldName: "fileSizeRaw",
        minWidth: 70,
        maxWidth: 250,
        data: "number",
        onRender: function (item) {
            return react_1["default"].createElement("span", null, item.fileSizeRaw + " KB");
        }
    },
    {
        key: "column6",
        name: "Status",
        fieldName: "status",
        minWidth: 70,
        maxWidth: 250,
        data: "boolean",
        onRender: function (item) {
            return react_1["default"].createElement("span", null, item.status ? "Done" : "Processing");
        }
    },
];
var groups = [
    {
        key: "group0",
        isCollapsed: true,
        name: "Group Items 1",
        startIndex: 0,
        count: 4
    },
    {
        key: "group1",
        name: "Group Items 2",
        startIndex: 4,
        count: 4,
        isCollapsed: true
    },
    {
        key: "group2",
        name: "Group Items 3",
        startIndex: 8,
        count: 1,
        isCollapsed: true
    },
    {
        key: "group3",
        name: "Group Items 4",
        startIndex: 9,
        count: 1,
        isCollapsed: true
    },
    {
        key: "group4",
        name: "Group Items 5",
        startIndex: 10,
        count: 3,
        isCollapsed: true
    },
];
function App() {
    var _a = react_1["default"].useState([]), serverItems = _a[0], setServerItems = _a[1];
    var _b = react_1["default"].useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1["default"].useState(""), darkMode = _c[0], setDarkMode = _c[1];
    var onChangeMode = function () {
        if (darkMode === "dark") {
            setDarkMode("light");
        }
        if (darkMode !== "dark") {
            setDarkMode("dark");
        }
    };
    //   <ListSelected>
    var onHandleSelection = function (selectedItems) {
        console.log(selectedItems);
    };
    //   </ListSelected>
    //   <ListRowClick>
    var onHandleRowClick = function (item) {
        console.log("clicked");
        console.log(item);
    };
    //   </ListRowClick>
    // <ListQueryObject>
    var onHandleQueryObject = function (sortObject, filterObj) {
        console.log(sortObject);
        console.log(filterObj);
    };
    //   </ListQueryObject>
    // <ListObjectGetData>
    var onCallApi = function (endpoint) {
        axios_1["default"]("https://5f2fcc046b05e900163bd050.mockapi.io/api/files" + endpoint)
            .then(function (doc) {
            var res = doc.data;
            var currentItem = __spreadArrays(serverItems);
            res.forEach(function (item) {
                item.dateModified = new Date(item.dateModified);
                currentItem.push(item);
            });
            if (serverItems.length === currentItem.length) {
                setIsLoading(false);
            }
            setServerItems(currentItem);
        })["catch"](function (err) { return console.log(err); });
    };
    var onGetDataList = function (page, itemCount, order, fieldName) {
        if ((isLoading && (!order || !fieldName)) || (page === 0 && !isLoading)) {
            setIsLoading(true);
            onCallApi("?page=" + page + "&limit=" + itemCount);
            // onCallApi(buildQuery({ top: itemCount, skip: itemCount * page }));
            // onCallApi(`?$top=${itemCount}&$skip=${itemCount * page}`);
        }
        if (isLoading && order && fieldName) {
            // let expand = {
            //   [fieldName]: {
            //     top: itemCount,
            //     skip: itemCount * page,
            //     orderBy: `${fieldName} ${order}`,
            //   },
            // };
            // onCallApi(buildQuery({ expand });
            onCallApi("?sortBy=" + fieldName + "&order=" + order + "&page=" + page + "&limit=" + itemCount
            // `?$top=${itemCount}&$skip${itemCount * page}&$orderby=${fieldName}`
            );
        }
    };
    //   </ListObjectGetData>
    //   <ListGetFilterObject>
    var onHandleFilterObject = function (obj) {
        console.log(obj);
    };
    //   </ListGetFilterObject>
    //   <ListClearFilter>
    var onHandleCancelFilter = function () {
        setServerItems([]);
        setIsLoading(true);
    };
    //   </ListClearFilter>
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(AppStyle_1.Wrapper, { theme: darkMode },
            react_1["default"].createElement("div", { className: "toggle-wrapper" },
                react_1["default"].createElement(Toggle_1.Toggle, { label: "Dark mode", onChange: onChangeMode })),
            react_1["default"].createElement("div", { style: {
                    height: "500px",
                    width: "1000px",
                    position: "relative",
                    paddingLeft: "400px"
                } },
                react_1["default"].createElement(ListCustom_1["default"], { columns: defaultColumns, loading: isLoading, 
                    // <ListGroup>
                    groups: groups, 
                    // </ListGroup>
                    // <ListDarkMode>
                    darkMode: darkMode, 
                    //   </ListDarkMode>
                    items: serverItems, onGetSelectionItem: onHandleSelection, onGetFilterObject: onHandleFilterObject, onRowClick: onHandleRowClick, onGetItemsList: function (page, itemCount, order, fieldName) { return onGetDataList(page, itemCount, order, fieldName); }, onRemoveFilter: onHandleCancelFilter, onGetQueryObject: onHandleQueryObject })))));
}
exports["default"] = App;
