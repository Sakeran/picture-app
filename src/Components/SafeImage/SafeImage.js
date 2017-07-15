// Wrapper for <img> tags. Displays a fallback image if the image load fails.

import React from 'react';

import fallback from './missingLink.png';

const onError = (e) => {
  e.target.src = fallback;
}

const SafeImage = (props) => (
  <img className={props.className} src={props.src} alt={props.alt} onError={onError} />
);

export default SafeImage;
