import React from 'react';
import './LoadMore.css';

function LoadMore(props) {
    if (!props.showMoreFollowers) {
        return null;
    }

    return (
        <div onClick={props.onClick} className="loadMore">
            Load More Followers
        </div>
    );
}

export default LoadMore;