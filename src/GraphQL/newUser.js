import query from './query';

export default (username, password, passwordConfirm) => {
  const mutation = `mutation SignUp($name: String!, $pw: String!, $pwc: String!) {
    signup(username: $name, password: $pw, passwordConfirm: $pwc)
  }`;

  return query({
    query: mutation,
    variables: {
      name: username,
      pw: password,
      pwc: passwordConfirm
    }
  })
  .then(res => res.newUser);
};
