
# GitHub User Search

https://rachel-flux.github.io/github-user-search/

This single-page application allows users to search by GitHub username.  The GitHub username, avitar, and number of followers are included in the search results, as well as avatar thumbnails for their followers.  For users with many followers (ex. holman) a subset of followers are listed, with the option to load more.

This project was built in React, bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Create React App is a thin layer on top of many other projects including Webpack, Babel, ESLint, and Jest.  For this GitHub User Search project, I left the provided environment as-is, but we could eject to allow for a customized setup.
 
The GitHub API calls are made via fetch.  The first call returns the user which includes a URL to get their followers.  The second call fetches the provided URL to return the followers.  The GitHub documentation warns against generating the followers URL on your own, so these calls are fetched sequentially rather than using Promise.all() to aggregate the results.
