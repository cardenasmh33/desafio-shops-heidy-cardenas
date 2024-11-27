import React, { useEffect, useState } from "react";

function Gallery(props) {
    const { pictures } = props;
    const [selectedPicture, setSelectedPicture] = useState();

    useEffect(() => {
        setSelectedPicture(pictures[0]);
    }, [pictures]);

    return (
        <div className="product-gallery-container">
            <div className="product-gallery-thumbnails">
                {pictures.slice(0, 7).map((pictureSrc, index) => {
                    return (

                        <img
                            key={`image-${index}`}
                            src={pictureSrc}
                            alt="Imagen de Producto"
                            className={`product-thumbnail ${pictureSrc === selectedPicture ? "selected" : ""}`}
                            onClick={() => setSelectedPicture(pictureSrc)}
                        />
                    )
                })}
            </div>
            <img src={selectedPicture} alt="Imagen principal de producto" className="product-image" />
        </div>
    );
}

export default Gallery;