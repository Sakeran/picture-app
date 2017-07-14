import query from './query';

export default (title, link, description) => {
  const mutation = `mutation CreatePost($tl: String!, $ln: String!, $dsc: String) {
    createPost(title: $tl, link: $ln, description: $dsc)
  }`;

  return query({
    query: mutation,
    variables: {
      tl: title,
      ln: link,
      dsc: description
    }
  })
  .then(res => res.createPost);
};
