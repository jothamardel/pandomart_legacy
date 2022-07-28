import { TYPES_PER_PAGE } from '@/framework/client/variables';
import { useTypes } from '@/framework/type';

export default function useHomepage() {
  const { types } = useTypes({
    limit: TYPES_PER_PAGE,
  });


  // console.log("Use home: ", types)
  
  if (!types) {
    return {
      homePage: {
        slug: '',
      },
    };
  }
  return {
    homePage: types?.categories.find((type: {}) => type?.type?.settings.isHome) ?? types?.categories[0],
  };
}
