import React from "react";
import PropTypes from "prop-types";

export default function VideoCard({recipeData}) {
    if (!recipeData.strYoutube) {
        return;
    }
    const videoId = recipeData.strYoutube.split('=')[1];

    return (
        <div className="video-card">
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
}