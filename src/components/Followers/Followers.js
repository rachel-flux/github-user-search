import React from 'react';
import './Followers.css';


function Followers(props) {
    if (!props.followers || !(props.followers.length > 0)) {
        return null;
    }

    return (
        <div>
            <ul className="followerList">
                {props.followers.map((item, index) => (
                    <li key={index} className="follower"><img src={item.avatar_url} className="followerAvatar" /></li>
                ))}
            </ul>
        </div>
    );
}

export default Followers;