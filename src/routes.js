// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  renamePath: (id) => [host, prefix, 'contacts', id].join('/'),
  removePath: (id) => [host, prefix, 'contacts', id].join('/'),
  addPath: () => [host, prefix, 'contacts'].join('/'),
  contactsPath: () => [host, prefix, 'contacts'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
};
