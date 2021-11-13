import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'

import './index.css'

const UserDetailsItem = props => {
  const {
    userFullDetails,
    addUserIdIntoSelectedUsersList,
    removeUserIdFromSelectedUsersList,
    deleteSelectedUser,
    editUserInfo,
    selectAllUsers,
    selectedUsersList,
  } = props
  const {id, name, email, role} = userFullDetails
  console.log(selectedUsersList)

  const onSelectUser = event => {
    const checkedUserId = event.target.value
    if (event.target.checked) {
      addUserIdIntoSelectedUsersList(checkedUserId)
    } else {
      removeUserIdFromSelectedUsersList(checkedUserId)
    }
  }

  const userItemBackgroundColorClassName = selectedUsersList.includes(id)
    ? 'selected-user-item-background-color'
    : ''

  const onClickDeleteUser = () => {
    deleteSelectedUser(id)
  }

  const onClickEditUser = () => {
    editUserInfo(id)
  }

  return (
    <li
      className={`user-details-list-item ${userItemBackgroundColorClassName}`}
    >
      <div className="checkbox-container">
        {selectAllUsers ? (
          <input
            type="checkbox"
            onChange={onSelectUser}
            checked={selectAllUsers}
            value={id}
            className="checkbox"
          />
        ) : (
          <input
            type="checkbox"
            onChange={onSelectUser}
            //   checked={selectAllUsers}
            value={id}
            className="checkbox"
          />
        )}
      </div>
      <p className="user-name">{name}</p>
      <p className="user-email">{email}</p>
      <p className="user-role">{role}</p>
      <div className="actions-container">
        <BiEdit size={20} onClick={onClickEditUser} />
        <MdDelete size={23} onClick={onClickDeleteUser} />
      </div>
    </li>
  )
}

export default UserDetailsItem
