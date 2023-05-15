import { X, Trash2, ArrowRight, ArrowLeft, Eye } from "react-feather";
import { Box } from "@chakra-ui/react";

import Image from "next/image";

export const Bookmarks = ({
  bookmarksVisible,
  setBookmarksVisible,
  bookmarkedMovies,
  handleDeleteMovie,
  setbookmarkedMovies,
  handleWatched,
  imageLoader,
}) => {
  return (
    <Box className="bg-white w-[100vw] h-[100vh] absolute top-0 right-0 overflow-auto border-l border-black">
      <Box className="border-b h-16 pl-5 flex  items-center ">
        <ArrowLeft
          size={24}
          onClick={() => {
            setBookmarksVisible(!bookmarksVisible);
          }}
        />
        <Box className="ml-5 text-[18px] font-bold">Bookmarked Movies</Box>
      </Box>
      <Box className="w-full h-20  flex justify-center items-center flex-col  text-[14px] px-5  bg-[#C3B1E1] text-white">
        <Box className="font-bold">
          {bookmarkedMovies.length === 0
            ? "Bookmark Some Movies"
            : `You Bookmarked ${bookmarkedMovies.length} Movies!`}
        </Box>
      </Box>
      <Box className="w-full flex-1  md:grid md:grid-cols-3">
        {bookmarkedMovies.map((movie) => {
          return (
            <Box
              className="h-[150px] flex justify-between border-b md:border-b-0 mt-10 pr-3"
              key={movie.imbdID}
            >
              <Box className="w-[25%] h-[70%] flex justify-center items-center">
                <Image
                  loader={() => imageLoader(movie.Poster)}
                  src={movie.Poster}
                  alt={`Poster of ${movie.Title}`}
                  width={80}
                  height={80}
                  className="ml-2 border rounded-md"
                />
              </Box>
              <Box className="w-[70%]  flex flex-col justify-between ">
                <Box className="flex font-bold">
                  <Box>{movie.Title}</Box>
                </Box>
                <Box className=" flex justify-end mb-2 ">
                  <Box
                    className="w-2/5 border flex justify-center items-center h-10 rounded-md mr-2 border-black"
                    onClick={() => handleWatched(movie)}
                  >
                    <Eye size={20} />
                  </Box>
                  <Box
                    className="w-2/5 border flex justify-center items-center h-10 rounded-md border-black"
                    onClick={() => handleDeleteMovie(movie.Title)}
                  >
                    <Trash2 size={20} />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box className="w-full h-[75px]  flex justify-between items-center  text-[14px] px-5">
        <Box className="font-bold text-[16px]">Total Bookmarks</Box>
        <Box className="font-bold text-[16px]">{bookmarkedMovies.length} </Box>
      </Box>
      <Box className="w-full h-24  flex justify-center items-center  text-[14px] px-5  bg-black">
        <button
          className="border rounded-2xl w-[90%] h-10 font-bold text-white text-[18px]"
          onClick={() => {
            setbookmarkedMovies([]);
          }}
        >
          Clear Bookmarks
        </button>
      </Box>
    </Box>
  );
};
