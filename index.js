const handleNavLinkClick = (event)=>{
    event.preventDefault();
    event.isNavigate = true;
};
const NavLink = (props)=>React.createElement("a", {
        onclick: handleNavLinkClick,
        ...props
    }, props.children);
const getHtmlChildren = (elem)=>Array.from(elem.children);
const getHtmlName = (elem)=>elem.tagName.toLowerCase();
const getHtmlParentElement = (elem)=>elem.parentElement;
const findHtmlAscendant = (elem, func)=>{
    if (!elem) return;
    if (func(elem)) return elem;
    return findHtmlAscendant(getHtmlParentElement(elem), func);
};
const findHtmlAscendants = (elem, func, elems = [])=>{
    if (!elem) return elems;
    if (func(elem)) elems.push(elem);
    return findHtmlAscendants(getHtmlParentElement(elem), func, elems);
};
const findHtmlDescendant = (elem, func)=>{
    if (func(elem)) return elem;
    for(let index = 0; index < elem.children.length; index++){
        const descendant = findHtmlDescendant(elem.children[index], func);
        if (descendant) return descendant;
    }
};
const findHtmlDescendants = (elem, func, elems = [])=>{
    if (func(elem)) elems.push(elem);
    for(let index = 0; index < elem.children.length; index++)findHtmlDescendants(elem.children[index], func, elems);
    return elems;
};
const hideHtmlElement = (elem)=>elem.setAttribute("hidden", true);
const showHtmlElement = (elem)=>elem.removeAttribute("hidden");
const isHtmlElement = (elem)=>elem.nodeType === 1;
const validateHtmlElement = (elem)=>isHtmlElement(elem) ? "" : "Element type should be HTML element.";
const getEventName = (handlerName)=>handlerName.replace("on", "");
const storeEventHandler = (elem, handlerName, handler)=>elem[handlerName] = handler;
const setEventHandler = (elem, handlerName, handler)=>{
    const eventName = getEventName(handlerName);
    elem.removeEventListener(eventName, elem[handlerName]);
    elem.addEventListener(eventName, handler);
    storeEventHandler(elem, handlerName, handler);
    return elem;
};
const isHtmlRouter = (elem)=>getHtmlName(elem) === "router";
const findRouter = (elem)=>findHtmlAscendant(elem, isHtmlRouter);
const RootPath = "/";
const isEmptyPath = (path)=>path == "";
const isRootPath = (path)=>path === RootPath;
const isPathParam = (path)=>path.startsWith(":") || path.includes("/:");
const PathDelimiter = "/";
const splitPath = (path, delimiter = PathDelimiter)=>path.split(delimiter);
const getUrlPath = (url, path)=>{
    if (isRootPath(path)) return RootPath;
    const pathParts = splitPath(path, PathDelimiter);
    const urlParts = splitPath(url, PathDelimiter);
    return pathParts.map((pathPart, index)=>pathPart && urlParts[index]).join(PathDelimiter);
};
const skipUrlPath = (url, urlPath)=>url.replace(urlPath, "");
const toLowerCasePath = (path)=>path?.toLowerCase();
const matchPaths = (path1, path2)=>isPathParam(path2) ? true : toLowerCasePath(path1) === toLowerCasePath(path2);
const matchUrlPath = (url, path)=>{
    const urlParts = splitPath(url);
    const pathParts = splitPath(path);
    return url.match(path) != null || pathParts.every((pathPart, index)=>isEmptyPath(pathPart) || matchPaths(urlParts[index], pathPart));
};
const trimUrl = (url, __char = PathDelimiter)=>{
    if (!url.length) return url;
    if (url.startsWith(__char) && url.endsWith(__char)) return url.substr(1, url.length - 1);
    if (url.startsWith(__char)) return url.substr(1);
    if (url.endsWith(__char)) return url.substr(0, url.length - 1);
    return url;
};
const isEmptyUrl = (url)=>!url;
const getRouteData = (elem)=>elem.__routeData;
const existsRoute = (elem)=>elem;
const isMatchedRoute = (urlPart)=>(elem)=>matchUrlPath(urlPart, getRouteData(elem).path);
const isRoute = (elem)=>getHtmlName(elem) === "route";
const isConsumer = (elem)=>elem.__history || elem.__location || elem.__routeParams || elem.__searchParams;
const isVisiblePath = (elem)=>findHtmlAscendants(elem, isRoute).every((elem)=>!elem.hidden);
const findConsumers = (elem)=>findHtmlDescendants(elem, isConsumer);
const getUpdateFunc = (elem)=>elem?.ownerDocument?.__update;
const updateConsumer = (update)=>(elem)=>update(elem)[0];
const updateConsumers = (elem, update = getUpdateFunc(elem))=>findConsumers(elem).filter(isVisiblePath).map(updateConsumer(update));
const addToHistory = (history, url, state = {})=>history?.pushState(state, "", url);
const getHistory = (elem)=>elem.ownerDocument.__history;
const getHistoryPolyfill = (hrefs = [])=>Object.freeze({
        hrefs,
        pushState: (_, __, href)=>hrefs.push(href)
    });
const setHistory = (elem)=>elem.ownerDocument.__history = globalThis.history ?? getHistoryPolyfill();
const getDefaultLocation = (url)=>new URL("http://localhost" + url);
const setLocation = (elem, url)=>elem.ownerDocument.__location = globalThis.location ?? getDefaultLocation(url);
const addRouteParams = (params, newParams)=>params && Object.assign(params, newParams);
const getRouteParams = (elem)=>elem.ownerDocument.__routeParams;
const splitPath1 = (path, delimiter = "/")=>path?.split(delimiter);
const isArrayString = (text)=>text.startsWith("[") && text.endsWith("]");
const isDateString = (text)=>!isNaN(Date.parse(text));
const isFloatString = (text)=>!isNaN(text) && !isNaN(parseFloat(text));
const isIntegerString = (text)=>!isNaN(text) && !isNaN(parseInt(text));
const isObjectString = (text)=>text.startsWith("{") && text.endsWith("}");
const getStringType = (text)=>{
    if (isObjectString(text)) return "object";
    if (isArrayString(text)) return "array";
    if (isFloatString(text)) return "float";
    if (isIntegerString(text)) return "integer";
    if (isDateString(text)) return "date";
};
const toStringType = (text)=>{
    if (typeof text !== 'string') return text;
    switch(text){
        case "":
            return "";
        case "true":
            return true;
        case "false":
            return false;
        case "null":
            return null;
        case "undefined":
            return undefined;
    }
    switch(getStringType(text)){
        case "object":
            return JSON.parse(text);
        case "array":
            return JSON.parse(text);
        case "float":
            return parseFloat(text);
        case "integer":
            return parseInt(text);
        case "date":
            return new Date(Date.parse(text));
        default:
            return text;
    }
};
const removePrefix = (param)=>param.replace(":", "");
const setRouteParam = (params, param)=>(params[removePrefix(param[0])] = toStringType(param[1]), params);
const setRouteParams = (elem, params)=>elem.ownerDocument.__routeParams = params;
const RouteParamPrefix = ":";
const isRouteParam = (routePart)=>routePart.startsWith(RouteParamPrefix) || routePart.startsWith("/" + RouteParamPrefix);
const resolveRouteParams = (url, path = "")=>{
    const urlParts = splitPath1(url);
    const routeParts = splitPath1(path);
    const getIndex = (_, index)=>index;
    return routeParts.map(getIndex).filter((index)=>isRouteParam(routeParts[index])).map((index)=>[
            routeParts[index],
            urlParts[index]
        ]).reduce(setRouteParam, {});
};
const QueryDelimiter = "?";
const getQueryString = (url, delimiter = QueryDelimiter)=>splitPath1(url, delimiter)[1];
const getSearchParams = (elem)=>elem.ownerDocument.__searchParams;
const setSearchParam = (params, param)=>(params[param[0]] = toStringType(param[1]), params);
const setSearchParams = (elem, params)=>elem.ownerDocument.__searchParams = params;
const resolveSearchParams = (url)=>{
    const queryString = getQueryString(url);
    const searchParams = new URLSearchParams(queryString);
    if (!searchParams.size) return undefined;
    return searchParams.entries().reduce(setSearchParam, {});
};
const getRouteChild = (elem)=>elem.children[0];
const existsRouteDataPath = (routeData)=>routeData.path;
const existsRouteDataLoadChild = (routeData)=>typeof routeData.loadChild === "function";
const isRouteDataLoadFunction = (routeData)=>!routeData.loadChild || typeof routeData.loadChild === "function";
const isRouteDataChildObject = (routeData)=>!routeData.child || typeof routeData.child === "object";
const getRenderFunc = (elem)=>elem?.ownerDocument?.__render;
const renderRouteChild = async (elem, routeData, routeParams, searchParams, render = getRenderFunc(elem))=>existsRouteDataLoadChild(routeData) ? render(await routeData.loadChild(routeParams, searchParams), elem)[0] : render(routeData.child, elem)[0];
const findIndexRoute = (elems)=>elems.find((elem)=>getRouteData(elem).index);
const findSiblingRoute = (urlPart)=>(elems)=>!isEmptyUrl(urlPart) ? elems.find(isMatchedRoute(urlPart)) : findIndexRoute(elems);
const findSiblingRoutes = (elem)=>getHtmlChildren(getHtmlParentElement(elem)).filter(isRoute);
const pipe = (firstArg, ...funcs)=>funcs.reduce((arg, func)=>arg != undefined ? func(arg) : arg, firstArg);
const findDescendantRoute = (elem)=>findHtmlDescendant(elem, isRoute);
const findRoute = (elem, urlPart)=>pipe(elem, findDescendantRoute, findSiblingRoutes, findSiblingRoute(urlPart));
const toggleRoute = (elem, showElem)=>elem === showElem ? showHtmlElement(showElem) : hideHtmlElement(elem);
const toggleRoutes = (elems, showElem)=>elems.map((elem)=>toggleRoute(elem, showElem));
const changeRoute = async (elem, url, routes = [])=>{
    const route = findRoute(elem, url);
    if (!existsRoute(route) && isEmptyUrl(url)) return [
        routes
    ];
    if (!existsRoute(route)) return [
        ,
        `Route ${url} not found.`
    ];
    const routeData = getRouteData(route);
    const routeParams = resolveRouteParams(url, routeData.path);
    addRouteParams(getRouteParams(route), routeParams);
    const routeChild = getRouteChild(route) || await renderRouteChild(route, routeData, getRouteParams(route), getSearchParams(route));
    toggleRoutes(findSiblingRoutes(route), route);
    const urlPath = getUrlPath(url, routeData.path);
    const nextUrl = trimUrl(skipUrlPath(url, urlPath));
    return changeRoute(routeChild, nextUrl, [
        ...routes,
        route
    ]);
};
const createRouteData = (path, child, loadChild, index = false)=>Object.freeze({
        path,
        child,
        loadChild,
        index
    });
const setRouteData = (elem, routeData)=>elem.__routeData = routeData;
const validateRouteDataChild = (routeData)=>isRouteDataChildObject(routeData) ? "" : "Route child should be jsx element.";
const validateRouteDataLoad = (routeData)=>isRouteDataLoadFunction(routeData) ? "" : "Route load should be function.";
const validateRouteDataPath = (routeData)=>existsRouteDataPath(routeData) ? "" : "Route path is missing.";
const validateRouteData = (routeData)=>[
        validateRouteDataPath(routeData),
        validateRouteDataChild(routeData),
        validateRouteDataLoad(routeData)
    ].filter((error)=>error);
const isLogLibraryEnabled = (elem, libraryName)=>elem.__log.includes(libraryName);
const isLogMounted = (elem)=>elem.__log instanceof Array;
const isLogEnabled = (elem, libraryName)=>isLogMounted(elem) && isLogLibraryEnabled(elem, libraryName);
const LibraryName = "routing";
const LogHeader = "[routing]";
const logError = (elem, ...args)=>(isLogEnabled(elem, LibraryName) && console.error(LogHeader, ...args), args[0]);
const logInfo = (elem, ...args)=>isLogEnabled(elem, LibraryName) && console.info(LogHeader, ...args);
const setRoutingData = (elem, url)=>{
    setLocation(elem, url);
    setRouteParams(elem, {});
    setSearchParams(elem, resolveSearchParams(url));
    return elem;
};
const throwError = (message)=>{
    if (!message) return false;
    throw new Error(message);
};
const throwErrors = (messages)=>{
    if (!messages.length) return false;
    throw new Error(messages.join(","));
};
const missingRouterError = "Router is missing.";
const navigateFromHistory = async (elem, url)=>{
    logInfo(elem, "Navigate to:", url);
    throwError(validateHtmlElement(elem));
    const router = findRouter(elem);
    if (!router) return logError(elem, missingRouterError);
    setRoutingData(router, url);
    const [routes, changeRouteError] = await changeRoute(router, url);
    if (changeRouteError) return logError(router, `Navigation error: ${changeRouteError}`);
    const consumers = updateConsumers(router);
    return [
        routes,
        consumers
    ];
};
const navigateFromUser = (elem, url)=>{
    addToHistory(getHistory(elem), url);
    return navigateFromHistory(elem, url);
};
const setPopStateHandler = (elem, navigate)=>setEventHandler(elem, "onpopstate", (event)=>navigate(event.target, event.target.location.href, true));
const setNavigateHandler = (elem, navigate)=>setEventHandler(elem, "onclick", (event)=>event.isNavigate && navigate(event.target, event.target.href));
const Router = (props, elem)=>{
    setHistory(elem);
    setPopStateHandler(elem, navigateFromHistory);
    setNavigateHandler(elem, navigateFromUser);
    return props.children;
};
const Route = (props, elem)=>{
    const routeData = createRouteData(props.path, props.child, props.load, "index" in props);
    throwErrors(validateRouteData(routeData));
    setRouteData(elem, routeData);
    return React.createElement(React.Fragment, null);
};
export { NavLink as NavLink };
export { Router as Router };
export { Route as Route };
export { navigateFromUser as navigate };
