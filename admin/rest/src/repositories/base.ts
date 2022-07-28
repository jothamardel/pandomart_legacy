import http from "@utils/api/http";

export default class Base<C, U> {
  http = async <T>(
    url: string,
    type: string,
    variables: T | null = null,
    options?: any
  ) => {
    return (http as any)[type](url, variables, options);
  };
  all = async (url: string) => {
    return this.http(url, "get");
    return this.http(`https://pandomart-bazaar.herokuapp.com/api/v1/user/list?isActive=true&role=625c7ba9c4c1b16967dd8307`, "get");
  };
  allShops = async (id: string) => {
    // return this.http(url, "get");
    return this.http(`https://pandomart-bazaar.herokuapp.com/api/v1/shops`, "get");
  };

  find = async (url: string) => {
    return this.http(url, "get");
  };

  create = async (url: string, variables: C) => {
    console.log("Creating shop", variables);
    return this.http<C>('https://pandomart-bazaar.herokuapp.com/api/v1/shops/', "post", variables);
  };

  update = async (url: string, variables: U) => {
    return this.http<U>(url, "put", variables);
  };

  delete = async (url: string) => {
    return this.http(url, "delete");
  };
}
