import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { MdArticle } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

function Navbar() {

    return (
        <div className="Navbar">
            <li className="Navbar__Item">
                <Link to="/articles" className="Navbar__Link">
                    <MdArticle />
                    Articles
                </Link>
            </li>
            <li className="Navbar__Item">
                <Link to="/create" className="Navbar__Link" data-testid="createArticlePageLink">
                    <IoIosCreate />
                    Create Article
                </Link>
            </li>
        </div>
    )

}

export default Navbar;