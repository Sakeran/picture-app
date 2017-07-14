import React from 'react';
import PropTypes from 'prop-types';

import Formsy from 'formsy-react';
import TextInput from '../formComponents/TextInput';
import TextField from '../formComponents/TextField';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class NewPostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
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
    console.log(link, title, description);
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />
    }
    return (
      <Formsy.Form onValidSubmit={this.submit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}>
        <TextInput name="link"
                   title="Link to an image or Youtube video:"
                   required/>
        <TextInput name="title"
                   title="Give your post a title:"
                   required/>
        <TextField name="description"
                  title="Description (optional)"/>
        <input type="submit"
                className="button"
                disabled={!this.state.canSubmit}
                value="Post" />
      </Formsy.Form>
    );
  }
}

NewPostForm.propTypes = {
  sendFunc: PropTypes.func.isRequired,
  user: PropTypes.object,
  flashSuccess: PropTypes.func,
  flashError: PropTypes.func
};

const mapStateToProps = (state) => ({
  user: state.common.user
});

const mapDispatchToProps = (dispatch) => ({
  flashSuccess: (msg) => dispatch({type: 'FLASH_SUCCESS', message: msg}),
  flashError: (msg) => dispatch({type: 'FLASH_ERROR', message: msg})
});

const ConnectedNewPostForm = connect(mapStateToProps, mapDispatchToProps)(NewPostForm);

export { NewPostForm };
export default ConnectedNewPostForm;
