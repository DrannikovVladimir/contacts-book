/* eslint-disable import/no-anonymous-default-export */
import AddForm from './AddForm.jsx';
import RemoveForm from './RemoveForm.jsx';
import RenameForm from './RenameForm.jsx';

const forms = {
  adding: AddForm,
  removing: RemoveForm,
  renaming: RenameForm,
};

export default (type) => forms[type];
