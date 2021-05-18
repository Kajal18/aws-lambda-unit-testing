const createUser = require('../usersApi/createUser');
const getAllUsers = require('../usersApi/getUsers');
const updateUser = require('../usersApi/updateUser');
const deleteUser = require('../usersApi/deleteUser');

let userId;
describe('create user', () => {
  test('creating user', () => {
    const event = {
      body: JSON.stringify({
        user_name: 'test',
        password: 'test',
      }),
      headers: {
        'content-type': 'application/json',
      },
      httpMethod: 'POST',
      isBase64Encoded: true,
      path: '',
      requestContext: {},
      resource: '',
    };
    return createUser.handler(event).then((user) => {
      userId = JSON.parse(user.body).user_id;
      expect(user.statusCode).toBe(200);
    });
  });
});

describe('get all users', () => {
  test('get all users', () => {
    const event = {
      headers: {
        'content-type': 'application/json',
      },
      httpMethod: 'GET',
      isBase64Encoded: true,
      path: '',
      requestContext: {},
      resource: '',
    };
    return getAllUsers.handler(event).then((users) => {
      expect(users.statusCode).toBe(200);
    });
  });
});

describe('update users', () => {
  test('update users', () => {
    console.log({ userId });
    const event = {
      body: JSON.stringify({
        user_name: 'test -2',
      }),
      headers: {
        'content-type': 'application/json',
      },
      httpMethod: 'PATCH',
      pathParameters: { user_id: userId },
      isBase64Encoded: true,
      path: '',
      requestContext: {},
      resource: '',
    };
    return updateUser.handler(event).then((users) => {
      expect(users.statusCode).toBe(200);
    });
  });
});

describe('delete users', () => {
  test('delete users', () => {
    console.log({ userId });
    const event = {
      headers: {
        'content-type': 'application/json',
      },
      httpMethod: 'DELETE',
      pathParameters: { user_id: userId },
      isBase64Encoded: true,
      path: '',
      requestContext: {
        authorizer: {
          claims: {
            user: { user_id: userId },
          },
        },
      },
      resource: '',
    };
    return deleteUser.handler(event).then((users) => {
      expect(users.statusCode).toBe(200);
    });
  });
});
