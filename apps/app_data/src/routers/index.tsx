import Count from "@/pages/Count";
import { filterAppRDisabled } from "@/utils";
import type { ReactNode } from "react";
import Layout from "@/layout";

export interface IAppRoute {
  path: string;
  component?: any;
  disabled?: boolean;
  children?: IAppRoute[];
  errorElement?: ReactNode | null;
  exact?: boolean;
}

const AppRoute: IAppRoute[] = [
  { path: "/count", disabled: false, component: Count },
  {
    path: "/",
    disabled: false,
    exact: true,
    component: Layout,
  },
];

export const staticAppRoute = filterAppRDisabled(AppRoute);
