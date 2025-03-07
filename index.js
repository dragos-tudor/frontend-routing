const handleNavLinkClick = (event)=>{
    event.preventDefault();
    event.isNavigate = true;
};
const NavLink = (props)=>React.createElement("a", {
        onclick: handleNavLinkClick,
        ...props
    }, props.children);
const createRouteData = (path, child, loadChild, index = false)=>Object.freeze({
        path,
        child,
        loadChild,
        index
    });
const setRouteData = (elem, routeData)=>elem.__routeData = routeData;
const existsRouteDataPath = (routeData)=>routeData.path;
const existsRouteDataLoadChild = (routeData)=>typeof routeData.loadChild === "function";
const isRouteDataLoadFunction = (routeData)=>!routeData.loadChild || typeof routeData.loadChild === "function";
const isRouteDataChildObject = (routeData)=>!routeData.child || typeof routeData.child === "object";
const validateRouteDataChild = (routeData)=>isRouteDataChildObject(routeData) ? "" : "Route child should be jsx element.";
const validateRouteDataLoad = (routeData)=>isRouteDataLoadFunction(routeData) ? "" : "Route load should be function.";
const validateRouteDataPath = (routeData)=>existsRouteDataPath(routeData) ? "" : "Route path is missing.";
const validateRouteData = (routeData)=>[
        validateRouteDataPath(routeData),
        validateRouteDataChild(routeData),
        validateRouteDataLoad(routeData)
    ].filter((error)=>error);
const addRouteParams = (params, newParams)=>params && Object.assign(params, newParams);
const getRouteParams = (elem)=>elem.ownerDocument.__routeParams;
const splitPath = (path, delimiter = "/")=>path?.split(delimiter);
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
const fromStringType = (text)=>{
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
const setRouteParam = (params, param)=>(params[removePrefix(param[0])] = fromStringType(param[1]), params);
const setRouteParams = (elem, params)=>elem.ownerDocument.__routeParams = params;
const RouteParamPrefix = ":";
const isRouteParam = (routePart)=>routePart.startsWith(RouteParamPrefix) || routePart.startsWith("/" + RouteParamPrefix);
const resolveRouteParams = (url, path = "")=>{
    if (path instanceof RegExp) return {};
    const urlParts = splitPath(url);
    const routeParts = splitPath(path);
    return routeParts.map((routePart, index)=>isRouteParam(routePart) && [
            routePart,
            urlParts[index]
        ]).filter((part)=>part).reduce(setRouteParam, {});
};
const useRouteParams = (elem)=>(elem.__routeParams = true) && getRouteParams(elem);
const QueryDelimiter = "?";
const getQueryString = (url, delimiter = QueryDelimiter)=>splitPath(url, delimiter)[1];
const getSearchParams = (elem)=>elem.ownerDocument.__searchParams;
const setSearchParam = (params, param)=>(params[param[0]] = fromStringType(param[1]), params);
const setSearchParams = (elem, params)=>elem.ownerDocument.__searchParams = params;
const resolveSearchParams = (url)=>{
    const queryString = getQueryString(url);
    const searchParams = new URLSearchParams(queryString);
    if (!searchParams.size) return undefined;
    return Array.from(searchParams.entries()).reduce(setSearchParam, {});
};
const skipQueryString = (url, delimiter = QueryDelimiter)=>url.split(delimiter)[0];
const useSearchParams = (elem)=>(elem.__searchParams = true) && getSearchParams(elem);
const RootPath = "/";
const PathDelimiter = "/";
const isEmptyPath = (path)=>path === "";
const isEndPathDelimiter = (path)=>path.endsWith(PathDelimiter);
const isRegExpPath = (path)=>path instanceof RegExp;
const isRootPath = (path)=>path === RootPath;
const isPathParam = (path)=>path.startsWith(":") || path.includes("/:");
const trimEndPath = (path)=>{
    if (isEmptyPath(path)) return path;
    if (isRootPath(path)) return path;
    if (isEndPathDelimiter(path)) return path.substr(0, path.length - 1);
    return path;
};
const splitPath1 = (path)=>path.split(PathDelimiter);
const getUrlPath = (url, path)=>{
    if (isRootPath(path)) return RootPath;
    if (isRegExpPath(path)) return url.match(path).join(PathDelimiter);
    const pathParts = splitPath1(trimEndPath(path), PathDelimiter);
    const urlParts = splitPath1(trimEndPath(url), PathDelimiter);
    return pathParts.map((_, index)=>urlParts[index]).join(PathDelimiter);
};
const getUrlPathName = (url)=>url.startsWith("http") ? new URL(url).pathname : url;
const skipUrlPath = (url, urlPath)=>url.replace(urlPath, "");
const toLowerCasePath = (path)=>path?.toLowerCase();
const matchPaths = (path1, path2)=>isPathParam(path2) ? true : toLowerCasePath(path1) === toLowerCasePath(path2);
const matchUrlPathPart = (urlParts)=>(pathPart, index)=>matchPaths(urlParts[index], pathPart);
const matchUrlPath = (url, path)=>{
    if (isRegExpPath(path)) return path.test(url);
    const urlParts = splitPath1(url);
    const pathParts = splitPath1(path);
    return pathParts.every(matchUrlPathPart(urlParts));
};
const NavigationError = "Navigation error: ";
const RouteNotFound = "Route #url not found.";
const isLogLibraryEnabled = (elem, libraryName)=>elem.__log.includes(libraryName);
const isLogMounted = (elem)=>elem.__log instanceof Array;
const isLogEnabled = (elem, libraryName)=>isLogMounted(elem) && isLogLibraryEnabled(elem, libraryName);
const LibraryName = "routing";
const LogHeader = "[routing]";
const logError = (elem, ...args)=>isLogEnabled(elem, LibraryName) && console.error(LogHeader, ...args);
const logInfo = (elem, ...args)=>isLogEnabled(elem, LibraryName) && console.info(LogHeader, ...args);
const getRouteChild = (elem)=>elem.children[0];
const getRenderFunc = (elem)=>elem?.ownerDocument?.__render;
const getUpdateFunc = (elem)=>elem?.ownerDocument?.__update;
const renderRouteChild = async (elem, routeData, routeParams, searchParams, render = getRenderFunc(elem))=>existsRouteDataLoadChild(routeData) ? render(await routeData.loadChild(routeParams, searchParams), elem)[0] : render(routeData.child, elem)[0];
const getRouteData = (elem)=>elem.__routeData;
const getHtmlBody = (elem)=>elem.ownerDocument.body;
const getHtmlChildren = (elem)=>Array.from(elem.children);
const getHtmlName = (elem)=>elem.tagName.toLowerCase();
const getHtmlParentElement = (elem)=>elem.parentElement;
const findBreadthHtmlDescendant = (elems, func)=>{
    for (const elem of elems)if (func(elem)) return elem;
    for (const elem of elems){
        const descendant = findBreadthHtmlDescendant(getHtmlChildren(elem), func);
        if (descendant) return descendant;
    }
};
const findBreadthHtmlDescendants = (elems, func, result = [])=>{
    for (const elem of elems)if (func(elem)) result.push(elem);
    for (const elem of elems)findBreadthHtmlDescendants(getHtmlChildren(elem), func, result);
    return result;
};
const existsHtmlElement = (elem)=>!!elem;
const isHiddenHtmlElement = (elem)=>elem.hidden;
const isHtmlElement = (elem)=>elem.nodeType === 1;
const findHtmlAscendant = (elem, func)=>{
    if (!existsHtmlElement(elem)) return undefined;
    if (func(elem)) return elem;
    return findHtmlAscendant(getHtmlParentElement(elem), func);
};
const findHtmlDescendant = (elem, func, findStrategy = findBreadthHtmlDescendant)=>findStrategy(getHtmlChildren(elem), func);
const findHtmlDescendants = (elem, func, result = [], findStrategy = findBreadthHtmlDescendants)=>findStrategy(getHtmlChildren(elem), func, result);
const findHtmlRoot = (elem)=>globalThis["Deno"] ? findHtmlAscendant(elem, (elem)=>!getHtmlParentElement(elem)) : getHtmlBody(elem);
const hideHtmlElement = (elem)=>(elem.style.display = "none", elem);
const showHtmlElement = (elem)=>(elem.style.display = "block", elem);
const validateHtmlElement = (elem)=>isHtmlElement(elem) ? "" : "Element type should be HTML element.";
const getEventName = (handlerName)=>handlerName.replace("on", "");
const addEventListener = (elem, handlerName, handler)=>elem[handlerName] = handler;
const removeEventListener = (elem, handlerName)=>elem.removeEventListener(getEventName(handlerName), elem[handlerName]);
const setEventHandler = (elem, handlerName, handler)=>{
    removeEventListener(elem, handlerName);
    addEventListener(elem, handlerName, handler);
    return elem;
};
const existsRoute = (elem)=>elem;
const isMatchedRoute = (urlPart)=>(elem)=>matchUrlPath(urlPart, getRouteData(elem).path);
const isRouteElement = (elem)=>getHtmlName(elem) === "route";
const findIndexRoute = (elems)=>elems.find((elem)=>getRouteData(elem).index);
const findSiblingRoute = (urlPart)=>(elems)=>elems.find(isMatchedRoute(urlPart)) || findIndexRoute(elems);
const findSiblingRoutes = (elem)=>getHtmlChildren(getHtmlParentElement(elem)).filter(isRouteElement);
const pipe = (firstArg, ...funcs)=>funcs.reduce((arg, func)=>arg != undefined ? func(arg) : arg, firstArg);
const findSelfOrDescendantRoute = (elem)=>isRouteElement(elem) ? elem : findHtmlDescendant(elem, isRouteElement);
const findRoute = (elem, urlPart)=>pipe(elem, findSelfOrDescendantRoute, findSiblingRoutes, findSiblingRoute(urlPart));
const toggleRoute = (routeElem, showElem)=>routeElem === showElem ? showHtmlElement(showElem) : hideHtmlElement(routeElem);
const toggleRoutes = (routeElems, showElem)=>routeElems.map((routeElem)=>toggleRoute(routeElem, showElem));
const changeRoute = async (elem, url, routes = [])=>{
    const route = findRoute(elem, url);
    if (!existsRoute(route) && !isEmptyPath(url)) return [
        ,
        RouteNotFound.replace("#url", url)
    ];
    if (!existsRoute(route)) return [
        routes
    ];
    logInfo(elem, "Route to: ", url);
    const routeData = getRouteData(route);
    const pathRouteParams = resolveRouteParams(url, routeData.path);
    const routeParams = addRouteParams(getRouteParams(route), pathRouteParams);
    const searchParams = getSearchParams(route);
    const routeChild = getRouteChild(route) || await renderRouteChild(route, routeData, routeParams, searchParams);
    const siblingRoutes = findSiblingRoutes(route);
    toggleRoutes(siblingRoutes, route);
    const urlPath = getUrlPath(url, routeData.path);
    const nextUrl = skipUrlPath(url, urlPath);
    return changeRoute(routeChild, nextUrl, [
        ...routes,
        route
    ]);
};
const addToHistory = (history, url, state = {})=>history?.pushState(state, "", url);
const getHistory = (elem)=>elem.ownerDocument.__history;
const getHistoryPolyfill = (hrefs = [])=>Object.freeze({
        hrefs,
        pushState: (_, __, href)=>hrefs.push(href)
    });
const setHistory = (elem)=>elem.ownerDocument.__history = globalThis.history ?? getHistoryPolyfill();
const useHistory = (elem)=>(elem.__history = true) && getHistory(elem);
const getLocation = (elem)=>elem.ownerDocument.__location;
const getDefaultLocation = (url)=>new URL("http://localhost" + url);
const setLocation = (elem, url)=>elem.ownerDocument.__location = globalThis.location ?? getDefaultLocation(url);
const useLocation = (elem)=>(elem.__location = true) && getLocation(elem);
const isConsumer = (elem)=>elem.__history || elem.__location || elem.__routeParams || elem.__searchParams;
const isVisiblePath = (elem)=>!findHtmlAscendant(elem, (elem)=>isRouteElement(elem) && isHiddenHtmlElement(elem));
const findConsumers = (elem)=>findHtmlDescendants(elem, isConsumer);
const findVisiblePathConsumers = (elem)=>findConsumers(elem).filter(isVisiblePath);
const updateConsumer = (update)=>(elem)=>(logInfo(elem, "Update routing consumer: ", getHtmlName(elem)), update(elem)[0]);
const updateConsumers = (elem, update = getUpdateFunc(elem))=>findVisiblePathConsumers(elem).map(updateConsumer(update));
const throwError = (message)=>{
    if (!message) return false;
    throw new Error(message);
};
const throwErrors = (messages)=>{
    if (!messages.length) return false;
    throw new Error(messages.join(","));
};
const navigateToHistoryRoute = async (elem, url)=>{
    logInfo(elem, "Navigate to:", url);
    throwError(validateHtmlElement(elem));
    const root = findHtmlRoot(elem);
    setLocation(root, url);
    setRouteParams(root, {});
    setSearchParams(root, resolveSearchParams(url));
    const urlPathName = skipQueryString(getUrlPathName(url));
    const [routes, changeRouteError] = await changeRoute(root, urlPathName);
    if (changeRouteError) logError(elem, NavigationError, changeRouteError);
    if (changeRouteError) return NavigationError + changeRouteError;
    const consumers = updateConsumers(root);
    return [
        routes,
        consumers
    ];
};
const navigateToRoute = (elem, url)=>{
    addToHistory(getHistory(elem), url);
    return navigateToHistoryRoute(elem, url);
};
const isHtmlRouter = (elem)=>getHtmlName(elem) === "router";
const setNavigateHandler = (elem, navigate)=>setEventHandler(elem, "onclick", (event)=>event.isNavigate && navigate(event.target, event.target.href));
const setPopStateHandler = (window, navigate)=>setEventHandler(window, "onpopstate", ()=>navigate(findHtmlDescendant(window.document.body, isHtmlRouter), window.location.href, true));
const Router = (props, elem)=>{
    setHistory(elem);
    setNavigateHandler(elem, navigateToRoute);
    setPopStateHandler(globalThis, navigateToHistoryRoute);
    return props.children;
};
const Route = (props, elem)=>{
    const { path, child, load } = props;
    const routeData = createRouteData(path, child, load, "index" in props);
    throwErrors(validateRouteData(routeData));
    setRouteData(elem, routeData);
    return React.createElement(React.Fragment, null);
};
export { NavLink as NavLink };
export { Router as Router };
export { Route as Route };
export { useHistory as useHistory, useLocation as useLocation };
export { useSearchParams as useSearchParams, useRouteParams as useRouteParams };
export { navigateToRoute as navigate, changeRoute as changeRoute };
