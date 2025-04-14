import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
    layout('./Layout.tsx', [
        ...(await flatRoutes({
            rootDirectory: "./views"
        }))
    ])
] satisfies RouteConfig;