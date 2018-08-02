import React from 'react';
import Followers from '../components/Followers/Followers';
import LoadMore from '../components/LoadMore/LoadMore';
import Message from '../components/Message/Message';
import SearchForm from '../components/SearchForm/SearchForm';
import Spinner from '../components/Spinner/Spinner';
import User from '../components/User/User';
import './App.css';

const GITHUB_USERS_BASE_API = 'https://api.github.com/users';
const INPUT_VALIDATION_ERROR = 'Please enter a GitHub username';
const MAX_RESULTS = 30;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleLoadMoreFollowers = this.handleLoadMoreFollowers.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.fetchFollowers = this.fetchFollowers.bind(this);
        this.state = {
            searchTerms: '',
            fetching: false,
            user: null,
            followers: [],
            showMoreFollowers: false,
            errorMessage: '',
        };
    }

    handleSearchSubmit(e) {
        e.preventDefault();

        this.fetchUser();
    }

    handleLoadMoreFollowers(e) {
        e.preventDefault();

        this.fetchFollowers();
    }

    fetchUser() {
        let username = this.state.searchTerms.trim();
        if (username === '') {
            this.displayErrorMessage(INPUT_VALIDATION_ERROR);
            return;
        }

        this.setState({ user: null, followers: [], showMoreFollowers: false, errorMessage: '', fetching: true });

        let url = `${GITHUB_USERS_BASE_API}/${username}?per_page=${MAX_RESULTS}`;
        fetch(url)
            .then(this.checkStatus)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    user: {
                        username: data.login,
                        avatar: data.avatar_url,
                        num_followers: data.followers,
                        followers_api_url: data.followers_url
                    }
                });
            })
            .then(() => this.fetchFollowers())
            .catch(error => this.handleErrorLogging(error))
            .then(() => this.handleSearchComplete());
    }

    fetchFollowers() {
        if (this.state.user.num_followers > this.state.followers.length) {
            const nextPage = Math.ceil(this.state.followers.length / MAX_RESULTS) + 1;
            let url = this.state.user.followers_api_url + '?page='+ nextPage +'&per_page=' + MAX_RESULTS;

            this.setState({ fetching: true });

            fetch(url)
                .then(this.checkStatus)
                .then(response => response.json())
                .then((data) => {
                    let existingFollowers = this.state.followers.slice();
                    let allFollowers = existingFollowers.concat(data);

                    let showMoreFollowers = false;
                    if (this.state.user.num_followers > allFollowers.length) {
                        showMoreFollowers = true;
                    }

                    this.setState({
                        followers: allFollowers,
                        showMoreFollowers: showMoreFollowers,
                    });
                })
                .catch(error => this.handleErrorLogging(error))
                .then(() => this.handleSearchComplete());
        }
    }

    checkStatus(response) {
        if (!response.ok) {
            throw Error(response.status + ' ' + response.statusText);
        }
        return response;
    }

    handleErrorLogging(error) {
        this.displayErrorMessage(error.message);
        // We should also log the error to an error reporting service
        // TODO: logErrorToServer(error);
    }

    displayErrorMessage(message) {
        this.setState({ errorMessage: message });
    }

    handleSearchComplete() {
        this.setState({ searchTerms: '', fetching: false });
    }

    render() {
        return (
            <div>
                <SearchForm searchTerms={this.state.searchTerms} onSubmit={this.handleSearchSubmit} handleChange={(event) => this.setState({ searchTerms: event.target.value })} />
                <Message errorMessage={this.state.errorMessage} />
                <User user={this.state.user} />
                <Followers followers={this.state.followers} />
                <LoadMore showMoreFollowers={this.state.showMoreFollowers} onClick={this.handleLoadMoreFollowers} />
                <Spinner fetching={this.state.fetching} />
            </div>
        );
    }
}

export default App;
