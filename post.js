import React from 'react';
import Relay from 'react-relay';

class Post extends React.Component {
  render() {
    return (
      <blockquote>
        <p>{this.props.posts.title}</p>
        <footer>{this.props.posts.title}</footer>
      </blockquote>
    );
  }
}

Quote = Relay.createContainer(Post, {
  fragments: {}
});

export default Post;
