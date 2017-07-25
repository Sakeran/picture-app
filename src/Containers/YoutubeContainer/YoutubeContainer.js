import React from 'react';
import PropTypes from 'prop-types';

import Youtube from 'react-youtube';

import './YoutubeContainer.css';

class YoutubeContainer extends React.Component{

  render() {
    return (
      <div className="YoutubeContainer-wrapper">
        <Youtube
        videoId={this.props.videoId}
        className="YoutubeContainer-video"
        />
      </div>
    )
  }
}

YoutubeContainer.propTypes = {
  videoId: PropTypes.string.isRequired
};

export default YoutubeContainer;
