import type { FC } from "react";
import React, { useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import type { IAppRoute } from "@/routers";

interface IPage {
  AppRoute: IAppRoute[];
}

const Page: FC<IPage> = ({ AppRoute }) => {
  const getRouter = useCallback(
    (parentPath: string, childItem?: IAppRoute[], redirect = true) => {
      if (!childItem || !childItem.length) return;

      return childItem.map((item: IAppRoute) => {
        const path = parentPath + item.path;
        return redirect ? (
          <Route key={path} path={path} component={item.component} />
        ) : (
          <Redirect key={path} from={parentPath} to={path} />
        );
      });
    },
    []
  );

  return (
    <Switch>
      {AppRoute.map((item) =>
        item?.children ? (
          getRouter(item.path, item?.children)
        ) : (
          <Route key={item.path} path={item.path} component={item.component} />
        )
      )}

      {AppRoute.map((item) => getRouter(item.path, item.children, false))}
    </Switch>
  );
};

export default Page;
