import query from './query';

export default () => {
  const queryString = `mutation { logout }`;

  return query({
    query: queryString
  })
  .then(res => res.logout);
};
