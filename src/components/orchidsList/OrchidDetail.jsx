import React from "react";
import { useParams } from "react-router-dom";
import { listOrchids } from "../../data/listOrchids";

const OrchidDetail = () => {
  const { id } = useParams();
  const orchid = listOrchids.find((orchid) => orchid.id === Number(id));

  return (
    <div style={{ padding: "20px" }}>
      {orchid ? (
        <>
          <h1>{orchid.name}</h1>
          <img
            src={orchid.image}
            alt={orchid.name}
            style={{ width: "300px" }}
          />
          <p>Category: {orchid.category}</p>
          <p>Color: {orchid.color}</p>
          <p>Origin: {orchid.origin}</p>
          <p>Rating: {orchid.rating}</p>

          <iframe
            width="560"
            height="315"
            src={orchid.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </>
      ) : (
        <p>Orchid not found.</p>
      )}
    </div>
  );
};

export default OrchidDetail;
