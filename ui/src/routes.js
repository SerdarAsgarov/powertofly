import SearchLayout from "./layouts/Search";
import MainPage from "./views/MainPage/MainPage";


let routes = {
    "/": {
        name: "Main page",
        layout: SearchLayout,
        view: MainPage
    },
};

let getRouteByPath = (path) => {
    return routes[path] ?? {};
};

export default getRouteByPath;

