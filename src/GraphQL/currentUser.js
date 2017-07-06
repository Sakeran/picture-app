import query from './query';

export default () => {
  const queryString = `query { currentUser { username } }`;

  return query({
    query: queryString
  })
  .then(res => res.currentUser);
};
