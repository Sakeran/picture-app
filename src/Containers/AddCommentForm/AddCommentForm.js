import React from 'react';
import { graphql } from 'react-apollo';

import addCommentMutation from '../../GraphQL/Mutations/addCommentMutation';
import commentsQuery from '../../GraphQL/Queries/commentsQuery';
import postDetails from '../../GraphQL/Queries/postDetails';

import './AddCommentForm.css';

class AddCommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      commentText: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      commentText: e.target.value
    });
  }

  addComment = (e) => {
    e.preventDefault();
    if (!this.state.commentText) {
      return;
    }
    this.props.mutate({
      variables: {
        postId: this.props.postId,
        message: this.state.commentText
      },
      update: (store, { data: { addComment } }) => {
        if (!addComment) { return; }
        const data = store.readQuery({
          query: commentsQuery,
          variables: {
            postId: this.props.postId,
            offset: 0
          }
        });
        data.comments.unshift(addComment);
        store.writeQuery({
          query: commentsQuery,
          variables: {
            postId: this.props.postId,
            offset: 0
          },
          data
        });
        // We need to update the comment count in the post query, as well.
        const postData = store.readQuery({
          query: postDetails,
          variables: {
            id: this.props.postId
          }
        });
        postData.post.commentCount += 1;
        store.writeQuery({
          query: postDetails,
          variables: {
            id: this.props.postId
          },
          data: postData
        });
      }
    })
    .then(res => {
      this.setState({
        commentText: ''
      });
    });
  }

  render() {
    return (
      <div id="addComment" className="AddCommentForm">
        <h3 className="centered">Add a new comment:</h3>
        <form onSubmit={this.addComment}>
          <div className="field">
            <textarea name="comment"
              placeholder="Enter a comment here."
              value={this.state.commentText}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <input className="button" type="submit" value="Add Comment" />
          </div>
        </form>
      </div>
    )
  }
};

export { AddCommentForm };
export default graphql(addCommentMutation)(AddCommentForm);
