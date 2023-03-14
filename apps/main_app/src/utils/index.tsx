import { IAppRoute } from "@/routers";

export const filterAppRDisabled = function (appRouter: IAppRoute[]) {
  const data: IAppRoute[] = [];
  appRouter.map((item) => {
    if (item.disabled) {
      return;
    }
    if (item.children) {
      item.children = filterAppRDisabled(item.children);
    }
    data.push(item);
  });

  return data;
};
