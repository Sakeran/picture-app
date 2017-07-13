import React from 'react';
import { HOC } from 'formsy-react';

class TextInput extends React.Component {

  changeValue = (e) => {
    this.props.setValue(e.target.value);
  }

  render() {
    const errorMsg = this.props.getErrorMessage();
    return (
      <div className="field">
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input name={this.props.name} type={this.props.type || 'text'} onChange={this.changeValue} value={this.props.getValue()} />
        <span className="field-error">{errorMsg}</span>
      </div>
    )
  }

}

export { TextInput };
export default HOC(TextInput);
