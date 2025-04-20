import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/Settings": {};
  "/Profile": {};
  "/Logout": {};
  "/About": {};
  "/Blog": {};
  "/*": {
    "*": string;
  };
};