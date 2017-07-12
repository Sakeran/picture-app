import query from './query';

export default (id) => {
  const myQuery = `query getPost($id: String!) {
    post(id: $id) {
      id
      title
      description
      type
      image
      youtubeID
    }
  }`;

  return query({
    query: myQuery,
    variables: {
      id: id
    }
  })
  .then(res => res.post);
};
