import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCount, increaseCount } from "../featured/posts/postsSlice";

const Header = () => {
    const dispatch = useDispatch();
    const count = useSelector(getCount);
    return (
        <header className="Header">
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="post" className="link">
                            Post
                        </Link>
                    </li>
                    <li>
                        <Link to="user" className="link">
                            User
                        </Link>
                    </li>
                </ul>
                <button onClick={() => dispatch(increaseCount())}>
                    {count}
                </button>
            </nav>
        </header>
    );
};

export default Header;
