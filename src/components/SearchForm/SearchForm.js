import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
    return (
        <form onSubmit={props.onSubmit} className="searchForm">
            <input
                value={props.searchTerms}
                onChange={props.handleChange}
                type="text"
                placeholder="Search GitHub Username"
                className="searchFormInput" />
            <input
                type="submit"
                value="Submit"
                className="searchFormSubmit" />
        </form>
    );
}

export default SearchForm;