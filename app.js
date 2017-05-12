import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Post from '/post';

class QuotesLibrary extends React.Component {
  state = { allQuotes: [] };

  componentDidMount() {
    fetch(`/graphql?query={
                            posts {
                            title,
                            id
                            }
                          }`)
      .then(response => response.json())
      .then(json => this.setState(json.data))
      .catch(ex => console.error(ex))
  }

  render() {
    return (
      <div className="quotes-list">
        {this.state.allQuotes.map(posts =>
          <Post key={posts.title} posts={posts} />
        )}
      </div>
    )
  }
}

QuotesLibrary = Relay.createContainer(QuotesLibrary, {
  fragments: {}
});

class AppRoute extends Relay.Route {
  static routeName = 'App';
}

ReactDOM.render(
  <Relay.RootContainer
    Component={QuotesLibrary}
    route={new AppRoute()}
  />,
  document.getElementById('react')
);
