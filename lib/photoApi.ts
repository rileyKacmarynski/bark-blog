import { createApi } from "unsplash-js"

export type Photo = {
  id: string;
  width: number;
  height: number;
  urls: { 
    full: string; 
    regular: string; 
    raw: string;
    small: string;
  };
  color: string | null;
  user: {
    name: string;
    links: {
      self: string;
    }
  };
}

const api = createApi({
  accessKey: 'u-Ey3IXR1gdI2McGHpKAXWlmEeDDteSh3wzsGngfzPw',
})

export const getHeroImage = async (searchTerm: string): Promise<Photo> => {
  const res = await api.search
    .getPhotos({ query: `${searchTerm} dog`, orientation: 'landscape' })

  if(!res.response){
    throw new Error('unable to fetch hero image')
  }
  
  const index = Math.floor(Math.random() * 5)
  const image = res.response.results[index]
  return image
}