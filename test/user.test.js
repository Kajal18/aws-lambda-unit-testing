const createUser = require('../usersApi/createUser');
const getAllUsers = require('../usersApi/getUsers');
const updateUser = require('../usersApi/updateUser');
const deleteUser = require('../usersApi/deleteUser');

const createOrg = require('../organizationApi/createOrg');
const getAllOrgs = require('../organizationApi/getAllOrg');
const updateOrg = require('../organizationApi/updateOrg');
const deleteOrg = require('../organizationApi/deleteOrg');

let userId, orgId;
const event = {
  headers: {
    'content-type': 'application/json',
  },
  isBase64Encoded: true,
};

describe('create user', () => {
  test('creating user', () => {
    event.body = JSON.stringify({
      user_name: 'test',
      password: 'test',
    });
    event.httpMethod = 'POST';
    return createUser.handler(event).then((user) => {
      console.log('user.body', user.body);
      userId = user.body.id;
      expect(user.statusCode).toBe(200);
    });
  });
});

describe('get all users', () => {
  test('get all users', () => {
    event.httpMethod = 'GET';
    return getAllUsers.handler(event).then((users) => {
      expect(users.statusCode).toBe(200);
    });
  });
});

describe('update users', () => {
  test('update users', () => {
    console.log({ userId });
    event.body = JSON.stringify({
      user_name: 'test -2',
    });
    event.httpMethod = 'PATCH';
    event.pathParameters = { user_id: userId };
    return updateUser.handler(event).then((users) => {
      expect(users.statusCode).toBe(200);
    });
  });
});

describe('delete users', () => {
  test('delete users', () => {
    event.httpMethod = 'DELETE';
    event.pathParameters = { user_id: userId };
    event.requestContext = {
      authorizer: {
        claims: {
          user: { id: userId },
        },
      },
    };
    return deleteUser.handler(event).then((users) => {
      expect(users.statusCode).toBe(200);
    });
  });
});

//organization

describe('create organization', () => {
  test('creating organization', () => {
    event.body = JSON.stringify({
      orgName: 'test-org',
    });
    event.httpMethod = 'POST';
    return createOrg.handler(event).then((org) => {
      orgId = JSON.parse(org.body).id;
      expect(org.statusCode).toBe(200);
    });
  });
});

describe('get all org', () => {
  test('get all org', () => {
    event.httpMethod = 'GET';
    return getAllOrgs.handler(event).then((orgs) => {
      expect(orgs.statusCode).toBe(200);
    });
  });
});

describe('update org', () => {
  test('update org', () => {
    console.log({ userId });
    event.body = JSON.stringify({
      orgName: 'test-org-1',
    });
    event.httpMethod = 'PATCH';
    event.pathParameters = { orgId: orgId };
    event.requestContext = {
      authorizer: {
        claims: {
          user: { id: userId },
        },
      },
    };
    return updateOrg.handler(event).then((org) => {
      expect(org.statusCode).toBe(200);
    });
  });
});

describe('delete org', () => {
  test('delete org', () => {
    event.httpMethod = 'DELETE';
    event.pathParameters = { orgId: orgId };
    event.requestContext = {
      authorizer: {
        claims: {
          user: { id: userId },
        },
      },
    };
    return deleteOrg.handler(event).then((org) => {
      expect(org.statusCode).toBe(200);
    });
  });
});
