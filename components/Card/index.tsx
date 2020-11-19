import Link from "next/link";

import GENRES from "../../services/genres";
import React, { useContext } from "react";
import themeContext from "../../contexts/theme";
import classNames from "classNames/bind";
import css from "./styles.module.scss";
import Ratio from "../Ratio";
import { getImageFromApi } from "../../services/utils";

const cx = classNames.bind(css);
const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "a366c741ebcd23ebb98f75ee1b26fece";

export interface CardProps {
  className?: string;
  movie: any;
  ratio: number;
}

const Card = ({ className, movie, ratio }: CardProps) => {
  const themecontext = useContext(themeContext);
  const [theme] = themecontext;
  const {
    poster_path,
    original_title,
    original_name,
    genre_ids,
    vote_average,
    release_date,
    id,
  } = movie;

  const title = (title: string) => {
    return title.length > 30 ? `${title.substr(0, 28)}...` : title;
  };

  const genresList: string = genre_ids
    .slice(0, 2)
    .map((genre_id) => GENRES[genre_id])
    .join(" · ");

  return (
    <Link href={`movie/${id}`}>
      <a>
        <Ratio ratio={ratio}>
          {(className) => (
            <div className={css.card}>
              <img
                className={cx(css.card__picture, theme)}
                src={
                  poster_path
                    ? getImageFromApi(poster_path)
                    : "./assets/poster-not-found-no-text.jpg"
                }
                alt={`${movie.title} poster`}
              />
              <div className={cx(css.card__description, theme)}>
                <div className={css.text__container}>
                  <div className={css.titleContainer}>
                    <h3>
                      {original_title
                        ? title(original_title)
                        : title(original_name)}
                    </h3>
                  </div>
                  <p>{genresList}</p>
                  <div className={css.text__informations}>
                    <div className={css.text__information}>
                      {vote_average / 2}
                    </div>
                    {release_date && (
                      <div className={css.text__information}>
                        {release_date.slice(0, 4)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Ratio>
      </a>
    </Link>
  );
};

Card.defaultProps = {
  ratio: 274 / 468,
};

export default Card;
