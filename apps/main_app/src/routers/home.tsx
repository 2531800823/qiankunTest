import About from "@/pages/About";
import Hello from "@/pages/Hello";
import { filterAppRDisabled } from "@/utils";
import type { IAppRoute } from ".";

const AppRoute: IAppRoute[] = [
  { path: "/hello", disabled: false, component: Hello },
  { path: "/about", disabled: false, component: About },
];

export const staticHomeAppRoute = filterAppRDisabled(AppRoute);
