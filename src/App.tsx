import React from "react";
import "./App.css";
import { Toggle } from "aod-dependencies/Toggle";
import { initializeIcons } from "aod-dependencies/@uifabric/icons";
import { Wrapper } from "./AppStyle";
import ListCustom from "aod-dependencies/ListCustom";
import {
  IObjectFilter,
  ISortObject,
} from "aod-dependencies/ListCustom/ListStyle";
import { Icon } from "aod-dependencies/@uifabric/icons";
import axios from "axios";
import buildQuery from "odata-query";

initializeIcons();

const domainColumn = [
  {
    key: "column1",
    name: "ID",
    fieldName: "id",
    minWidth: 70,
    maxWidth: 300,
    priority: 1,
    data: "string",
    onRender: (item: any) => {
      return (
        <div className="name-col">
          <span>{item.id}</span>
        </div>
      );
    },
  },
  {
    key: "column3",
    name: "Domain",
    fieldName: "domain",
    minWidth: 70,
    maxWidth: 800,
    priority: 2,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.domain}</span>;
    },
  },
  {
    key: "column3",
    name: "Status",
    fieldName: "status",
    minWidth: 70,
    maxWidth: 300,
    priority: 2,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.status}</span>;
    },
  },
];

const defaultColumns = [
  {
    key: "column1",
    name: "Name",
    fieldName: "name",
    minWidth: 70,
    maxWidth: 400,
    priority: 1,
    data: "string",
    onRender: (item: any) => {
      return (
        <div className="name-col">
          <span>{item.name}</span>
        </div>
      );
    },
  },
  {
    key: "column2",
    name: "Date Modified",
    fieldName: "dateModified",
    minWidth: 70,
    maxWidth: 250,
    priority: 3,
    data: "date",
    onRender: (item: any) => {
      let option = {
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      return (
        <span>
          {item.dateModified
            .toLocaleDateString("en-US", option)
            .replace(",", "")}
        </span>
      );
    },
    isPadded: true,
  },
  {
    key: "column3",
    name: "Modified By",
    fieldName: "modifiedBy",
    minWidth: 70,
    maxWidth: 250,
    priority: 4,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.modifiedBy}</span>;
    },
  },
  {
    key: "column4",
    name: "Sharing",
    fieldName: "sharingBy",
    minWidth: 70,
    maxWidth: 250,
    data: "string",
    priority: 2,
    onRender: (item: any) => {
      return (
        <div>
          {item.sharingBy && (
            <Icon
              iconName="People"
              style={{ width: "12px", height: "12px", paddingRight: "8px" }}
            />
          )}
          <span>{item.sharingBy}</span>
        </div>
      );
    },
  },
  {
    key: "column5",
    name: "File Size",
    fieldName: "fileSizeRaw",
    minWidth: 70,
    maxWidth: 250,
    data: "number",
    onRender: (item: any) => {
      return <span>{`${item.fileSizeRaw} KB`}</span>;
    },
  },
  {
    key: "column6",
    name: "Status",
    fieldName: "status",
    minWidth: 70,
    maxWidth: 250,
    data: "boolean",
    onRender: (item: any) => {
      return <span>{item.status ? "Done" : "Processing"}</span>;
    },
  },
];

const groups = [
  {
    key: "group0",
    isCollapsed: true,
    name: "Group Items 1",
    startIndex: 0,
    count: 4,
  },
  {
    key: "group1",
    name: "Group Items 2",
    startIndex: 4,
    count: 4,
    isCollapsed: true,
  },
  {
    key: "group2",
    name: "Group Items 3",
    startIndex: 8,
    count: 1,
    isCollapsed: true,
  },
  {
    key: "group3",
    name: "Group Items 4",
    startIndex: 9,
    count: 1,
    isCollapsed: true,
  },
  {
    key: "group4",
    name: "Group Items 5",
    startIndex: 10,
    count: 3,
    isCollapsed: true,
  },
];

const items = [
  {
    key: "1",
    id: "2131234ohi4uh12",
    domain: "figma.com",
    status: "iasnd",
  },
  {
    key: "2",
    id: "dawuwua98ajhwa7",
    domain: "https://www.youtube.com/",
    status: "iasnd",
  },
];

function App() {
  const [serverItems, setServerItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isOffline, setOffline] = React.useState<boolean>(false);
  const [darkMode, setDarkMode] = React.useState<string>("");
  const onChangeMode = () => {
    if (darkMode === "dark") {
      setDarkMode("light");
    }
    if (darkMode !== "dark") {
      setDarkMode("dark");
    }
  };
  //   <ListSelected>
  const onHandleSelection = (selectedItems: any[]) => {
    console.log(selectedItems);
  };
  //   </ListSelected>
  //   <ListRowClick>
  const onHandleRowClick = (item: any) => {
    console.log("clicked");
    console.log(item);
  };
  //   </ListRowClick>

  // <ListQueryObject>
  const onHandleQueryObject = async (
    sortObject: ISortObject,
    filterObj: IObjectFilter[]
  ) => {
    if (filterObj.length === 0 && sortObject.key !== "") {
      onHandleSort(
        buildQuery({
          orderBy: [`${sortObject.key} ${sortObject.order}`],
        })
      );
      // onHandleSort(
      //   // `?sortBy=${sortObject.key}&order=${sortObject.order}&p=1&l=${sortObject.count}`
      // );
    }
    if (filterObj.length > 0 && sortObject.key === "") {
      let endpoint: any[] = [];
      filterObj.forEach((filter) => {
        let { key, value, operator } = filter;
        switch (operator) {
          case "contains":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { ge: value[0].date, le: value[value.length - 1].date },
              };
              endpoint.push(filterDateArr);
            } else {
              let filterContains = { [key]: { contains: value } };
              endpoint.push(filterContains);
            }
            break;

          case "not":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { lt: value[0].date, gt: value[value.length - 1].date },
              };
              endpoint.push(filterDateArr);
            } else {
              let filterNot = { not: { [key]: { contains: value } } };
              endpoint.push(filterNot);
            }
            break;

          default:
            let filterDefault = { [key]: { [operator]: value } };
            endpoint.push(filterDefault);
            break;
        }
      });
      onFilterDataFromServer(buildQuery({ filter: endpoint }));
    }
    if (filterObj.length > 0 && sortObject.key !== "") {
      let filterQuery: any[] = [];
      let expand = {};
      await filterObj.forEach((filter) => {
        let { key, value, operator } = filter;
        switch (operator) {
          case "contains":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { ge: value[0].date, le: value[value.length - 1].date },
              };
              filterQuery.push(filterDateArr);
            } else {
              let filterContains = { [key]: { contains: value } };
              filterQuery.push(filterContains);
            }
            break;
          case "not":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { lt: value[0].date, gt: value[value.length - 1].date },
              };
              filterQuery.push(filterDateArr);
            } else {
              let filterNot = { not: { [key]: { contains: value } } };
              filterQuery.push(filterNot);
            }

            break;
          default:
            let filterDefault = { [key]: { [operator]: value } };
            filterQuery.push(filterDefault);
            break;
        }
      });
      expand = {
        [sortObject.key]: {
          filter: filterQuery,
          orderBy: `${sortObject.key} ${sortObject.order}`,
        },
      };
      onHandleSort(buildQuery({ expand }));
      //   // onHandleSort(
      //   //   // `?sortBy=${sortObject.key}&order=${sortObject.order}&${filterObj.key}=${filterObj.value}`
      //   // );
    }
  };
  const onHandleSort = (endpoint: string) => {
    axios(`https://5f2fcc046b05e900163bd050.mockapi.io/api/files${endpoint}`)
      .then((doc) => {
        let res = doc.data;
        setOffline(false);
        res.forEach((item: any) => {
          item.dateModified = new Date(item.dateModified);
        });
        setServerItems(res);
      })
      .catch((err) => console.log(err));
  };
  //   </ListQueryObject>

  // <ListObjectGetData>
  const onCallApi = (endpoint: string) => {
    serverItems.length < 1 && setIsLoading(true);
    axios(`https://5f2fcc046b05e900163bd050.mockapi.io/api/files${endpoint}`)
      .then((doc) => {
        let res = doc.data;
        let currentItem = [...serverItems];
        res.forEach((item: any) => {
          item.dateModified = new Date(item.dateModified);
          currentItem.push(item);
        });
        if (serverItems.length === currentItem.length) {
          setOffline(true);
          setIsLoading(false);
        }
        setServerItems(currentItem);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const onGetDataList = (
    page: number,
    itemCount: number,
    order?: string,
    fieldName?: string
  ) => {
    if ((!isOffline && (!order || !fieldName)) || (page === 1 && isOffline)) {
      setOffline(false);
      onCallApi(`?page=${page}&limit=${itemCount}`);
      // onCallApi(buildQuery({ top: itemCount, skip: itemCount * page }));
      // onCallApi(`?$top=${itemCount}&$skip=${itemCount * page}`);
    }
    if (!isOffline && order && fieldName) {
      // let expand = {
      //   [fieldName]: {
      //     top: itemCount,
      //     skip: itemCount * page,
      //     orderBy: `${fieldName} ${order}`,
      //   },
      // };
      // onCallApi(buildQuery({ expand });
      onCallApi(
        `?sortBy=${fieldName}&order=${order}&page=${page}&limit=${itemCount}`
        // `?$top=${itemCount}&$skip${itemCount * page}&$orderby=${fieldName}`
      );
    }
  };
  //   </ListObjectGetData>

  //   <ListGetFilterObject>
  const onHandleFilterObject = async (obj: IObjectFilter[]) => {
    let endpoint: any[] = [];
    obj.forEach((filter) => {
      let { key, value, operator } = filter;
      switch (operator) {
        case "contains":
          if (Array.isArray(value)) {
            let filterDateArr = {
              [key]: { ge: value[0].date, le: value[value.length - 1].date },
            };
            endpoint.push(filterDateArr);
          } else {
            let filterContains = { [key]: { contains: value } };
            endpoint.push(filterContains);
          }
          break;

        case "not":
          if (Array.isArray(value)) {
            let filterDateArr = {
              [key]: { lt: value[0].date, gt: value[value.length - 1].date },
            };
            endpoint.push(filterDateArr);
          } else {
            let filterNot = { not: { [key]: { contains: value } } };
            endpoint.push(filterNot);
          }
          break;

        default:
          let filterDefault = { [key]: { [operator]: value } };
          endpoint.push(filterDefault);
          break;
      }
    });
    onFilterDataFromServer(buildQuery({ filter: endpoint }));
  };

  const onFilterDataFromServer = (endpoint: string) => {
    axios(
      `https://5f2fcc046b05e900163bd050.mockapi.io/api/files${endpoint}`
      // `https://5f2fcc046b05e900163bd050.mockapi.io/api/files?${obj.key}=${obj.value}`
    )
      .then((doc) => {
        let res = doc.data;
        let result: any[] = [];
        setOffline(false);
        res.forEach((item: any) => {
          item.dateModified = new Date(item.dateModified);
          result.push(item);
        });
        setServerItems(result);
      })
      .catch((err) => console.log(err));
  };
  //   </ListGetFilterObject>

  //   <ListClearFilter>
  // const onHandleCancelFilter = () => {
  //   setServerItems([]);
  //   setIsLoading(true);
  // };
  const onHandleCancelFilter = (filterObjectLength: number) => {
    setServerItems([]);
    filterObjectLength < 1 && setOffline(false);
  };
  //   </ListClearFilter>
  return (
    <div className="App">
      <Wrapper theme={darkMode}>
        <div className="toggle-wrapper">
          <Toggle label="Dark mode" onChange={onChangeMode} />
        </div>
        <div
          style={{
            height: "500px",
            width: "900px",
            position: "relative",
          }}
        >
          <ListCustom
            columns={defaultColumns}
            isOffline={isOffline}
            isLoading={isLoading}
            // <ListGroup>
            groups={groups}
            // </ListGroup>
            // <ListDarkMode>
            darkMode={darkMode}
            //   </ListDarkMode>
            items={serverItems}
            // onGetSelectionItem={onHandleSelection}
            // onGetFilterObject={onHandleFilterObject}
            // onRowClick={onHandleRowClick}
            onGetItemsList={(
              page: number,
              itemCount: number,
              order?: string,
              fieldName?: string
            ) => onGetDataList(page, itemCount, order, fieldName)}
            // onRemoveFilter={onHandleCancelFilter}
            // onGetQueryObject={onHandleQueryObject}
          />
        </div>
      </Wrapper>
    </div>
  );
}

export default App;
