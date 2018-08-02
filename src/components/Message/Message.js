import React from 'react';
import './Message.css';

function Message(props) {
    if (props.errorMessage === '') {
        return null;
    }

    return (
        <div className="message">
            {props.errorMessage}
        </div>
    );
}

export default Message;