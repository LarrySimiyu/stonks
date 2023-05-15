import { useState, useEffect } from "react";
import { Heading, Box, Button, Input, Text } from "@chakra-ui/react";
import { Trash2, Bookmark, Eye } from "react-feather";
import Image from "next/image";

import { Inter } from "next/font/google";
import axios from "axios";
import { Bookmarks } from "@/components/Bookmarks";
import { WatchedMovies } from "@/components/WatchedMovies";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [bookmarkedMovies, setbookmarkedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const [bookmarksVisible, setBookmarksVisible] = useState(false);
  const [watchedVisible, setWatchedVisible] = useState(false);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleBookMark = (selectedMovie) => {
    const movieExists = bookmarkedMovies.some(
      (movie) => movie.imdbID === selectedMovie.imdbID
    );
    const updatedData = data.map((movie) => {
      if (movie.imdbID === selectedMovie.imdbID) {
        return { ...movie, bookmarked: true };
      }
      return movie;
    });

    setData(updatedData);
    if (!movieExists) {
      setbookmarkedMovies([...bookmarkedMovies, selectedMovie]);
      setBookmarksVisible(!bookmarksVisible);
    }
  };

  const removeBookmark = (selectedMovie) => {
    const updatedData = data.map((movie) => {
      if (movie.imdbID === selectedMovie.imdbID) {
        return { ...movie, bookmarked: false };
      }
      return movie;
    });

    setData(updatedData);

    const updatedBookmarks = bookmarkedMovies.filter(
      (movie) => !(movie.imdbID === selectedMovie.imdbID)
    );
    setbookmarkedMovies(updatedBookmarks);
  };

  const removeWatched = (selectedMovie) => {
    const updatedData = data.map((movie) => {
      if (movie.imdbID === selectedMovie.imdbID) {
        return { ...movie, watched: false };
      }
      return movie;
    });

    setData(updatedData);

    const updatedWatched = bookmarkedMovies.filter(
      (movie) => !(movie.imdbID === selectedMovie.imdbID)
    );
    setWatchedMovies(updatedWatched);
  };

  const imageLoader = (moviePoster) => {
    return moviePoster;
  };

  const handleWatched = (selectedMovie) => {
    const movieExists = watchedMovies.some(
      (movie) => movie.imdbID === selectedMovie.imdbID
    );

    const updatedData = data.map((movie) => {
      if (movie.imdbID === selectedMovie.imdbID) {
        return { ...movie, watched: true };
      }
      return movie;
    });

    setData(updatedData);

    if (!movieExists) {
      setWatchedMovies([...watchedMovies, selectedMovie]);
      setWatchedVisible(!watchedVisible);
    }
  };
  console.log(process.env.NEXT_PUBLIC_PUBLICAPI_KEY);

  const handleSearch = async () => {
    // this is where the search request will go
    const response = await axios.get(
      "https://movie-database-alternative.p.rapidapi.com/",
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_PUBLICAPI_KEY,
          "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
        },
        params: {
          s: search,
          r: "json",
          page: "1",
        },
      }
    );
    const modifiedData = response.data.Search.map((movie) => ({
      ...movie,
      watched: false,
      bookmarked: false,
    }));

    setData(modifiedData);
    setSearch("");
  };

  const handleDeleteMovie = (movieName) => {
    const updatedBookmarks = bookmarkedMovies.filter(
      (movie) => !(movie.Title === movieName)
    );

    const updatedData = data.map((movie) => {
      if (movie.Title === movieName) {
        return { ...movie, bookmarked: false };
      }
      return movie;
    });

    setData(updatedData);
    setbookmarkedMovies(updatedBookmarks);
  };

  const handleDeleteWatchedMovie = (movieName) => {
    const updatedWatched = watchedMovies.filter(
      (movie) => !(movie.Title === movieName)
    );
    const updatedData = data.map((movie) => {
      if (movie.Title === movieName) {
        return { ...movie, watched: false };
      }
      return movie;
    });

    setData(updatedData);
    setWatchedMovies(updatedWatched);
  };

  console.log(data[0]);

  return (
    <main
      className={`flex min-h-screen flex-col movies-center ${inter.className} bg-white justify-center items-center`}
    >
      <Box className="bg-[#C3B1E1] w-full flex justify-between text-white px-5 items-center h-[60px]">
        <Box className="font-bold text-[18px] md:text-[25px] flex items-center">
          BoreDUM
        </Box>
        {/* <Box className=" flex justify-end w-1/3">
          <Box
            className=" w-4/5 border flex justify-around items-center h-1/2 rounded-md mr-2 border-white"
            onClick={() => setBookmarksVisible(!bookmarksVisible)}
          >
            <Bookmark size={20} />
            <Box className="font-bold">{bookmarkedMovies.length}</Box>
          </Box>
          <Box
            className="w-4/5 border flex justify-around items-center h-1/2 rounded-md border-white"
            onClick={() => setWatchedMovies(!watchedVisible)}
          >
            <Eye size={20} />
            <Box className="font-bold">{watchedMovies.length}</Box>
          </Box>
        </Box> */}
      </Box>
      <Box className="flex justify-between  w-full md:w-3/4 mt-2 px-2 md:mt-5">
        <Input
          placeholder="Search For A Movie"
          mr={2}
          onChange={handleSearchInput}
        />
        <Button
          colorScheme="black"
          variant={"outline"}
          onClick={handleSearch}
          isDisabled={search.length === 0}
          disabled={search.length === 0}
          _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          _hover={{ bg: "#C3B1E1", color: "white" }}
        >
          Search
        </Button>
      </Box>
      {data.length === 0 && (
        <Box className="w-full  flex flex-1 justify-center items-center text-[#C3B1E1]">
          <Heading>Search For A Movie</Heading>
        </Box>
      )}
      <Box className="w-full flex-1  md:grid md:grid-cols-4">
        {data.map((movie) => {
          return (
            <Box
              className="h-[150px] flex justify-between border-b mt-10 pr-3"
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
                <Box>
                  <Box>{movie.Year}</Box>
                </Box>
                <Box className=" flex justify-end mb-2 ">
                  <Box
                    className={`w-2/5 border flex justify-center items-center h-10 rounded-md mr-2 border-black ${
                      !movie.bookmarked
                        ? "text-black bg-white"
                        : "text-white bg-black"
                    }`}
                    onClick={() => {
                      {
                        movie.bookmarked
                          ? removeBookmark(movie)
                          : handleBookMark(movie);
                      }
                      setBookmarksVisible(!bookmarksVisible);
                    }}
                  >
                    <Bookmark size={20} />
                  </Box>
                  <Box
                    className={`w-2/5 border flex justify-center items-center h-10 rounded-md mr-2 border-black ${
                      movie.watched ? "text-white bg-black" : ""
                    }`}
                    onClick={() => {
                      {
                        movie.watched
                          ? removeWatched(movie)
                          : handleWatched(movie);
                      }
                      setWatchedVisible(!watchedVisible);
                    }}
                  >
                    <Eye size={20} />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      {bookmarksVisible && (
        <Bookmarks
          bookmarksVisible={bookmarksVisible}
          setBookmarksVisible={setBookmarksVisible}
          bookmarkedMovies={bookmarkedMovies}
          handleDeleteMovie={handleDeleteMovie}
          setbookmarkedMovies={setbookmarkedMovies}
          handleWatched={handleWatched}
          imageLoader={imageLoader}
        />
      )}
      {watchedVisible && (
        <WatchedMovies
          watchedVisible={watchedVisible}
          setWatchedVisible={setWatchedVisible}
          watchedMovies={watchedMovies}
          handleDeleteWatchedMovie={handleDeleteWatchedMovie}
          setWatchedMovies={setWatchedMovies}
          imageLoader={imageLoader}
        />
      )}
    </main>
  );
}
