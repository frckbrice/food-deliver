import React, { useState } from "react";
import { Form } from "react-router-dom";
import { updateMeal } from "./modules";
import "./style.css";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

export async function action() {}

const Favorite = ({ meal }) => {
  const [favorite, setFavorite] = useState(false);
  const handleClic = () => {
    if (favorite) {
      setFavorite(false);
    } else {
      setFavorite(true);
    }
  };

  return (
    <Form method="post">
      <button
        type="button"
        className="btn-favorite"
        onClick={() => handleClic()}
      >
        {favorite ? (
          <AiFillStar size={30} style={{ color: "yellow" }} />
        ) : (
          <AiOutlineStar size={30} />
        )}
      </button>
    </Form>
  );
};

export default Favorite;
