export default function redirectToChildRoute(
    parentRelativePath,
    childRoute,
    currentLocation,
    replaceLocation
) {

    const currentPath = currentLocation.pathname;

    if (!currentPath.endsWith(parentRelativePath)) {
        return false;
    }

    const childRelativePath = currentPath === "/" ?
        childRoute.path :
        ("/" + childRoute.path);

    replaceLocation({
        pathname: currentPath + childRelativePath
    });

    return true;
}
