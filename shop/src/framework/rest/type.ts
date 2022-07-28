import type { Type, TypeQueryOptions } from '@/types';
import { useQuery } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';
import axios from 'axios';
import { AUTH_TOKEN_KEY } from '@/lib/constants';


const fetchAllCategories = async () => {
  return axios.get('https://pandomart-bazaar.herokuapp.com/api/v1/categories')
}

export function useTypes2(options?: Partial<TypeQueryOptions>) {
  const {data, isLoading, error } = useQuery([], fetchAllCategories)
  // const { data, isLoading, error } = useQuery<Type[], Error>([], () => client.types.allTypes());
  // console.log("Types 2 categories: ", data)
  // console.log({
  //   data,
  //   isLoading,
  //   error
  // })
  return {
    types: [],
    isLoading: true,
    error: {},
  };
}

export function useTypes(options?: Partial<TypeQueryOptions>) {
  const { data, isLoading, error } = useQuery<Type[], Error>(
    [API_ENDPOINTS.TYPES, options],
    ({ queryKey }) => client.types.allTypes(Object.assign({}, queryKey[1]))
  );

  // console.log("Types categories: ",data)
  return {
    types: data?.data,
    isLoading,
    error,
  };
}

export function useType(slug: string) {
  const { data, isLoading, error } = useQuery<Type, Error>(
    [API_ENDPOINTS.TYPES, slug],
    () => client.types.get(slug),
    {
      enabled: Boolean(slug),
    }
  );
  return {
    type: data,
    isLoading,
    error,
  };
}
