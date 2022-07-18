export function matchPath(pathname: string, route: string, isHome?: boolean) {
	return isHome ? pathname === route : pathname.startsWith(route)
}
