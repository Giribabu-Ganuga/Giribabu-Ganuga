import {BiEdit} from 'react-icons/bi'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {TiTick} from 'react-icons/ti'

import './index.css'

const UserDetailsItem = props => {
  const {
    userFullDetails,
    addUserIdIntoSelectedUsersList,
    removeUserIdFromSelectedUsersList,
    deleteSelectedUser,
    editUserInfo,
    editUserId,
    editUserName,
    editUserEmail,
    editUserRole,
    selectedUsersList,
    onEditUserName,
    onEditUserEmail,
    onEditUserRole,
    updateEditedUserDetails,
  } = props
  const {id, name, email, role} = userFullDetails
  //   console.log(selectedUsersList)

  const onSelectUser = event => {
    const checkedUserId = event.target.value
    if (event.target.checked) {
      addUserIdIntoSelectedUsersList(checkedUserId)
    } else {
      removeUserIdFromSelectedUsersList(checkedUserId)
    }
  }

  const isEditActive = editUserId === id

  const userItemBackgroundColorClassName = selectedUsersList.includes(id)
    ? 'selected-user-item-background-color'
    : ''

  const selectAllCurrentPageUsers = selectedUsersList.includes(id)
    ? 'checked'
    : ''

  const onClickDeleteUser = () => {
    deleteSelectedUser(id)
  }

  const onClickEditUser = () => {
    editUserInfo(id)
  }

  const onClickTick = () => {
    updateEditedUserDetails()
  }

  const onChangeUserName = event => {
    onEditUserName(event)
  }

  const onChangeUserEmail = event => {
    onEditUserEmail(event)
  }

  const onChangeUserRole = event => {
    onEditUserRole(event)
  }

  return (
    <li
      className={`user-details-list-item ${userItemBackgroundColorClassName}`}
    >
      <div className="checkbox-container">
        <input
          type="checkbox"
          onChange={onSelectUser}
          checked={selectAllCurrentPageUsers}
          value={id}
          className="checkbox"
        />
      </div>
      {isEditActive ? (
        <>
          <input
            type="text"
            value={editUserName}
            className="user-name edit-input-element"
            onChange={onChangeUserName}
          />
          <input
            type="text"
            value={editUserEmail}
            className="user-email edit-input-element"
            onChange={onChangeUserEmail}
          />
          <input
            type="text"
            value={editUserRole}
            className="user-role edit-input-element"
            onChange={onChangeUserRole}
          />
          <div className="actions-container">
            <TiTick
              size={25}
              color="green"
              onClick={onClickTick}
              className="edit-icon"
            />
            <RiDeleteBin5Line
              size={20}
              color="red"
              onClick={onClickDeleteUser}
              className="delete-icon"
            />
          </div>
        </>
      ) : (
        <>
          <p className="user-name">{name}</p>
          <p className="user-email">{email}</p>
          <p className="user-role">{role}</p>
          <div className="actions-container">
            <BiEdit size={20} onClick={onClickEditUser} className="edit-icon" />
            <RiDeleteBin5Line
              size={20}
              color="red"
              onClick={onClickDeleteUser}
              className="delete-icon"
            />
          </div>
        </>
      )}
    </li>
  )
}

export default UserDetailsItem
