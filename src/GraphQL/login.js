import query from './query';

export default (username, password, passwordConfirm) => {
  const mutation = `mutation LogIn($name: String!, $pw: String!) {
    login(username: $name, password: $pw)
  }`;

  return query({
    query: mutation,
    variables: {
      name: username,
      pw: password,
    }
  })
  .then(res => res.login);
};
