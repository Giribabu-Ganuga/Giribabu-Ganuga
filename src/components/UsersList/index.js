import {Component} from 'react'

import Loader from 'react-loader-spinner'
import UserDetailsItem from '../UserDetailsItem'
import Pagination from '../Pagination'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UsersList extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    usersData: [],
    selectedUsersList: [],
    selectAllUsers: false,
    usersPerPage: 10,
    activePage: 1,
    editUserId: null,
    editUserName: '',
    editUserEmail: '',
    editUserRole: '',
  }

  componentDidMount() {
    this.fetchAllTheUsers()
  }

  fetchAllTheUsers = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    const response = await fetch(url)

    if (response.ok) {
      const fetchedUsersData = await response.json()
      this.setState({
        usersData: fetchedUsersData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  addUserIdIntoSelectedUsersList = checkedUserId => {
    this.setState(prevState => ({
      selectedUsersList: [...prevState.selectedUsersList, checkedUserId],
    }))
  }

  removeUserIdFromSelectedUsersList = unCheckedUserId => {
    const {selectedUsersList} = this.state
    const updateSelectedUsersList = selectedUsersList
    const unCheckedUserIdIndex = selectedUsersList.findIndex(
      item => item === unCheckedUserId,
    )
    updateSelectedUsersList.splice(unCheckedUserIdIndex, 1)
    this.setState({
      selectedUsersList: updateSelectedUsersList,
    })
  }

  editUserInfo = id => {
    const {usersData} = this.state
    const selectedUserDetails = usersData.find(eachUser => eachUser.id === id)
    if (selectedUserDetails) {
      this.setState({
        editUserId: selectedUserDetails.id,
        editUserName: selectedUserDetails.name,
        editUserEmail: selectedUserDetails.email,
        editUserRole: selectedUserDetails.role,
      })
    }
    // this.setState({editUserId: id})
  }

  updateEditedUserDetails = () => {
    const {
      editUserId,
      editUserName,
      editUserEmail,
      editUserRole,
      usersData,
    } = this.state

    const updatedUserDetails = {
      id: editUserId,
      name: editUserName,
      email: editUserEmail,
      role: editUserRole,
    }

    const updatedUsersData = usersData.map(eachUser =>
      eachUser.id === editUserId ? updatedUserDetails : eachUser,
    )
    this.setState({
      usersData: updatedUsersData,
      editUserId: null,
    })
  }

  onEditUserName = event => {
    this.setState({editUserName: event.target.value})
  }

  onEditUserEmail = event => {
    this.setState({editUserEmail: event.target.value})
  }

  onEditUserRole = event => {
    this.setState({editUserRole: event.target.value})
  }

  deleteSelectedUser = id => {
    const {usersData} = this.state
    const updatedUsersList = usersData.filter(eachUser => eachUser.id !== id)
    this.setState({usersData: updatedUsersList})
  }

  onSelectAllUsers = event => {
    const {usersData, activePage, usersPerPage} = this.state
    const indexOfLastUser = activePage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentPageUsers = usersData.slice(indexOfFirstUser, indexOfLastUser)
    const allSelectedUserIds = currentPageUsers.map(each => each.id)

    if (event.target.checked) {
      this.setState({
        selectAllUsers: true,
        selectedUsersList: allSelectedUserIds,
      })
    } else {
      this.setState({selectAllUsers: false, selectedUsersList: []})
    }
  }

  deleteSelectedUserItems = () => {
    const {selectedUsersList, usersData} = this.state
    const updateUsers = usersData.filter(
      eachUser =>
        selectedUsersList.findIndex(
          selectedUserId => selectedUserId === eachUser.id,
        ) === -1,
    )

    this.setState({
      usersData: updateUsers,
      selectAllUsers: false,
    })
  }

  onChangePageNumber = pageNumber => {
    this.setState({selectAllUsers: false, selectedUsersList: []})
    const {usersData, usersPerPage} = this.state
    const totalPagesCount = Math.ceil(usersData.length / usersPerPage)

    switch (pageNumber) {
      case 'FIRST':
        this.setState({activePage: 1})
        break
      case 'NEXT':
        this.setState(prevState => ({
          activePage:
            prevState.activePage < totalPagesCount
              ? prevState.activePage + 1
              : prevState.activePage,
        }))
        break
      case 'PREVIOUS':
        this.setState(prevState => ({
          activePage:
            prevState.activePage > 1
              ? prevState.activePage - 1
              : prevState.activePage,
        }))
        break
      case 'LAST':
        this.setState({activePage: totalPagesCount})
        break
      default:
        this.setState({activePage: pageNumber})
        break
    }
  }

  renderLoadingView = () => (
    <div className="usersList-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search by name, email or role"
          onChange={this.onChangeSearchInput}
        />
      </div>
    )
  }

  renderUsersListView = () => {
    const {
      usersData,
      searchInput,
      selectAllUsers,
      selectedUsersList,
      activePage,
      usersPerPage,
      editUserId,
      editUserName,
      editUserEmail,
      editUserRole,
    } = this.state

    const searchRelateUsersData = usersData.filter(
      eachUser =>
        eachUser.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachUser.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachUser.role.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const shouldShowUsersList = searchRelateUsersData.length > 0

    const indexOfLastUser = activePage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentPageUsers = searchRelateUsersData.slice(
      indexOfFirstUser,
      indexOfLastUser,
    )

    return shouldShowUsersList ? (
      <>
        <ul className="users-list-container">
          <li className="user-details-list-item">
            <div className="checkbox-container">
              <input
                type="checkbox"
                onChange={this.onSelectAllUsers}
                className="checkbox"
                checked={selectAllUsers}
              />
            </div>
            <p className="column-title name">Name</p>
            <p className="column-title email">Email</p>
            <p className="column-title role">Role</p>
            <p className="column-title actions">Actions</p>
          </li>
          {currentPageUsers.map(eachUser => (
            <UserDetailsItem
              key={eachUser.id}
              userFullDetails={eachUser}
              addUserIdIntoSelectedUsersList={
                this.addUserIdIntoSelectedUsersList
              }
              removeUserIdFromSelectedUsersList={
                this.removeUserIdFromSelectedUsersList
              }
              selectAllUsers={selectAllUsers}
              selectedUsersList={selectedUsersList}
              deleteSelectedUser={this.deleteSelectedUser}
              editUserInfo={this.editUserInfo}
              editUserId={editUserId}
              editUserName={editUserName}
              editUserEmail={editUserEmail}
              editUserRole={editUserRole}
              updateEditedUserDetails={this.updateEditedUserDetails}
              onEditUserName={this.onEditUserName}
              onEditUserEmail={this.onEditUserEmail}
              onEditUserRole={this.onEditUserRole}
            />
          ))}
        </ul>
        <Pagination
          totalPagesCount={Math.ceil(
            searchRelateUsersData.length / usersPerPage,
          )}
          deleteSelectedUserItems={this.deleteSelectedUserItems}
          onChangePageNumber={this.onChangePageNumber}
          activePage={activePage}
        />
      </>
    ) : (
      <div className="no-users-view">
        <h1 className="no-users-heading">No Users Found</h1>
        <p className="no-users-description">
          We could not find any user. Try other search.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="usersList-error-view-container">
      <h1 className="usersList-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="usersList-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.fetchAllTheUsers}
      >
        Tryagain
      </button>
    </div>
  )

  renderAllUsersList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUsersListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="all-users-container">
        <h1 className="main-heading">All Users List</h1>
        <div className="users-display-container">
          {this.renderSearchInput()}
          {this.renderAllUsersList()}
        </div>
      </div>
    )
  }
}

export default UsersList
