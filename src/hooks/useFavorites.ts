import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<any[]>(() => {
    const saved = localStorage.getItem("movie_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("movie_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: any) => {
    setFavorites((prev) => {
      const isExist = prev.find((m) => m.id === movie.id);
      if (isExist) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const isFavorite = (id: number) => favorites.some((m) => m.id === id);

  return { favorites, toggleFavorite, isFavorite };
};
