// @ts-check

import _ from 'lodash';
import HttpErrors from 'http-errors';

const { Unauthorized, Conflict } = HttpErrors;

const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
  const state = {
    contacts: [
      {
        firstName: 'Vladimir',
        lastName: 'Drannikov',
        phoneNumber: 77028883633,
        id: getNextId(),
      },
      {
        firstName: 'Yuliya',
        lastName: 'Privolneva',
        phoneNumber: 77017775896,
        id: getNextId(),
      },
    ],
    users: [
      { id: 1, username: 'admin', password: 'admin' },
    ],
  };

  if (defaultState.contacts) {
    state.contacts.unshift(...defaultState.contacts);
  }
  if (defaultState.users) {
    state.users.unshift(...defaultState.users);
  }

  return state;
};

export default (app, defaultState = {}) => {
  const state = buildState(defaultState);

  app.post('/api/v1/contacts', (req, reply) => {
    const { firstName, lastName, phoneNumber } = req.body;
    const contact = {
      firstName,
      lastName,
      phoneNumber,
      id: getNextId(),
    };
    state.contacts.unshift(contact);
    reply.code(201).send(contact);
  });

  app.patch('/api/v1/contacts/:id', (req, reply) => {
    const {
      firstName,
      lastName,
      phoneNumber,
      id,
    } = req.body;
    const newContact = {
      firstName,
      lastName,
      phoneNumber,
      id,
    };
    const contacts = state.contacts.map((c) => (c.id === id
      ? newContact
      : c));
    reply.code(201).send(contacts);
  });

  app.delete('/api/v1/contacts/:id', (req, reply) => {
    const contactsId = Number(req.params.id);
    state.contacts = state.contacts.filter((t) => t.id !== contactsId);

    reply.code(204).send();
  });

  app.post('/api/v1/login', async (req, reply) => {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = state.users.find((u) => u.username === username);

    if (!user || user.password !== password) {
      reply.send(new Unauthorized());
      return;
    }

    const token = app.jwt.sign({ userId: user.id });
    reply.send({ token, username });
  });

  app.post('/api/v1/signup', async (req, reply) => {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = state.users.find((u) => u.username === username);

    if (user) {
      reply.send(new Conflict());
      return;
    }

    const newUser = { id: getNextId(), username, password };
    const token = app.jwt.sign({ userId: newUser.id });
    state.users.push(newUser);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ token, username });
  });

  app.get('/api/v1/contacts', { preValidation: [app.authenticate] }, (req, reply) => {
    const user = state.users.find(({ id }) => id === req.user.userId);

    if (!user) {
      reply.send(new Unauthorized());
      return;
    }

    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(_.omit(state, 'users'));
  });

  app
    .get('*', (_req, reply) => {
      reply.view('index.pug');
    });
};
