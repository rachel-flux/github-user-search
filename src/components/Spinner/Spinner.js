import React from 'react';

function Spinner(props) {
    if (!props.fetching) {
        return null;
    }

    return (
        <div>
            Loading...
        </div>
    );
}

export default Spinner;