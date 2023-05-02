const API_KEY = "33237959-956d2abb27c8bf621410aa4ab";
const LINK_BASIS_START = `https://pixabay.com/api/?q=`;
export const PER_PAGE = 12;
const LINK_BASIS_END = `&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

const constructLink = (querry, page = 1) => {
  return `${LINK_BASIS_START}${querry}&page=${page}${LINK_BASIS_END}`;
};

const SearchImages = async (querry, page = 1) => {
  const link = constructLink(querry, page);
  try {
    const pictures = await (await fetch(link)).json();
    return {
      success: true,
      picturesData: pictures,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};

export default SearchImages;
