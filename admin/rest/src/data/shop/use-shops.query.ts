import { QueryParamsType, ShopsQueryOptionsType } from "@ts-types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Shop from "@repositories/shop";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { ShopPaginator } from "@ts-types/generated";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

const fetchShops = async ({
  queryKey,
}: QueryParamsType): Promise<{ shops: ShopPaginator }> => {
  const [_key, params] = queryKey;

  const {
    page,
    text,
    limit = 15,
    orderBy = "updated_at",
    sortedBy = "DESC",
  } = params as ShopsQueryOptionsType;

  const searchString = stringifySearchQuery({
    name: text,
  });
  const url = `${API_ENDPOINTS.SHOPS}?search=${searchString}&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Shop.all(url);
  return {
    shops: {
      data,
      paginatorInfo: mapPaginatorData({ ...rest }),
    },
  };
};



const getAllShops = async (shopId) => {
  const {data} =  await Shop.allShops('62d90b29a1b30f00162493cb');
  return {data};
}

const useShopsQuery = (options: ShopsQueryOptionsType) => {
  return useQuery<{ shops: ShopPaginator }, Error>(
    [API_ENDPOINTS.SHOPS, options],
    fetchShops,
    {
      keepPreviousData: true,
    }
  );
};

const useGetShopsQuery = () => {
  return useQuery<{ shops: ShopPaginator }, Error>(
    [],
    getAllShops,
    {
      keepPreviousData: true,
    }
  );
};

export { useShopsQuery, useGetShopsQuery, fetchShops, getAllShops };
