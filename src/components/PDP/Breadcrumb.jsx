import React from "react";
import { useNavigate, Link } from "react-router";

function Breadcrumb(props) {
    const { categories } = props;
    const navigate = useNavigate();

    function generatePostId() {
        let postId = "";
        Array.from({ length: 10 }).forEach(() => {
            postId += Math.floor(Math.random() * 10).toString();
        });

        return postId;
    }

    return (
        <div className="breadcrumb-container">
            <div className="breadcrumb">
                <Link className="back-link" onClick={(event) => {
                    event.preventDefault();
                    navigate(-1);
                }}>
                    Volver al listado
                </Link>
                <div className="breadcrumb-categories">
                    {categories.map((category, index) => (
                        <span key={`category-${index}`}>
                            <Link key={index} className="category-link" to={`/items?search=${category}`}>
                                {category}
                            </Link>
                            {index < categories.length - 1 && " > "}
                        </span>
                    ))}
                </div>
            </div>
            <span className="product-post">
                Publicación: <span className="post-id">#{generatePostId()}</span>
            </span>
        </div>
    );
}

export default Breadcrumb;