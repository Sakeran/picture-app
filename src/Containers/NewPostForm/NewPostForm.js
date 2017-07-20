import React from 'react';
import PropTypes from 'prop-types';

import Formsy from 'formsy-react';
import TextInput from '../formComponents/TextInput';
import TextField from '../formComponents/TextField';

import youtubeRegex from 'youtube-regex';
import getYoutubeId from 'get-youtube-id';

import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import {latestPostsQuery} from '../IndexContainer/IndexContainer';

class NewPostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
    };
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    })
  }


  submit = ({link, title, description}) => {
    this.props.mutate({
      variables: {
        link,
        title,
        description
      },
      refetchQueries: [{
        query: latestPostsQuery,
        variables: {
          offset: 0,
          limit: 20
        }
      }]
    })
    .then(({data: {newPost} }) => {
      if(!newPost) {
          this.props.flashError('Failed to create post.');
          this.props.requestRedirect('/');
          return;
      }
      this.props.flashSuccess('Successfully created post.');
      this.props.requestRedirect(`/post/${newPost.id}`);
    });
  }

  render() {
    return (
      <Formsy.Form onValidSubmit={this.submit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}>
        <TextInput name="link"
                   title="Link to an image or Youtube video:"
                   validations={{
                     isUrl: true,
                     isYoutube: (values, value) => {
                       if(!youtubeRegex().test(value)) {
                         return true; // Validation irrelevant.
                       }
                       return !!getYoutubeId(value);
                     }
                   }}
                   validationErrors={{
                     isUrl: "Link must be a valid URL",
                     isYoutube: "Invalid Youtube Link"
                   }}
                   required
                   value=""/>
        <TextInput name="title"
                   title="Give your post a title:"
                   validations="maxLength: 20"
                   validationError="Title must be 20 characters or less"
                   required
                   value="" />
        <TextField name="description"
                  title="Description (optional)"
                  value=""/>
        <input type="submit"
                className="button"
                disabled={!this.state.canSubmit}
                value="Post" />
      </Formsy.Form>
    );
  }
}

NewPostForm.propTypes = {
  flashSuccess: PropTypes.func,
  flashError: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  requestRedirect: (location) => dispatch({type: 'REQUEST_REDIRECT', location}),
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
  flashError: (msg) => dispatch({type: 'FLASH_ERROR', message: msg})
});

const newPostMutation = gql`
  mutation newPost($title: String!, $link: String!, $description: String) {
    newPost(title: $title, link: $link, description: $description) {
      id
    }
  }
`;

export { NewPostForm };
export default compose(
  connect(null, mapDispatchToProps),
  graphql(newPostMutation)
)(NewPostForm);
