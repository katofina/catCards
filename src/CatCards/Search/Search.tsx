import { ChangeEvent, useEffect, useState } from "react";
import { API_KEY, BREEDS_URL } from "../../constants/constant";
import { BreedInfo } from "../../types/types";
import { useNavigate } from "react-router";
import React from "react";
import "./Search.scss";

export default function Search() {
  const [searchString, setSearchString] = useState("");
  const [breedsArray, setBreedsArray] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const findByBreed = (id: string) => {
    navigate(`/catcards/breed_ids=${id}`);
    setSearchString("");
    setBreedsArray(null);
  };

  async function fetchBreedArray() {
    if (!searchString) {
      setBreedsArray(null);
      return;
    }

    setError(null);

    try {
      const response = await fetch(BREEDS_URL, {
        method: "GET",
        headers: { "x-api-key": API_KEY },
      });

      !response.ok && setError("Failed to fecth data.");

      const data = await response.json();

      const filteredArray = data.filter((breed: BreedInfo) =>
        breed.name.toLowerCase().includes(searchString.toLowerCase()),
      );
      setBreedsArray(filteredArray);
    } catch (err) {
      setError("Failed to fecth data.");
    }
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchString(e.target.value);

  useEffect(() => {
    fetchBreedArray();
  }, [searchString]);

  const handleBlur = () => setBreedsArray(null);

  return (
    <div>
      <input
        className="Search-input"
        type="text"
        placeholder="Search"
        value={searchString}
        onChange={handleInput}
        onBlur={handleBlur}
        onFocus={fetchBreedArray}
      />
      {error && <p>{error}</p>}

      {breedsArray && (
        <ul className="Search-breeds">
          {breedsArray.map((item: BreedInfo) => (
            <li key={item.id} onClick={() => findByBreed(item.id)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
