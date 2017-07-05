import query from './query';

export default (username, password, passwordConfirm) => {
  const mutation = `mutation NewUser($name: String!, $pw: String!, $pwc: String!) {
    newUser(username: $name, password: $pw, passwordConfirm: $pwc)
  }`;

  return query({
    query: mutation,
    variables: {
      name: username,
      pw: password,
      pwc: passwordConfirm
    }
  });
};
