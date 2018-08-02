import React from 'react';
import './User.css';

function User(props) {
    if (!props.user) {
        return null;
    }

    return (
        <div className="user">
            <img src={props.user.avatar} className="userAvatar" />
            {props.user.username} | {props.user.num_followers} followers
        </div>
    );
}

export default User;