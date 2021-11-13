import {Component} from 'react'
import Loader from 'react-loader-spinner'
import UserDetailsItem from '../UserDetailsItem'
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
    activePageId: 1,
    usersData: [],
    selectedUsersList: [],
    selectAllUsers: false,
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
    const selectedUserInfo = usersData.find(eachUser => eachUser.id === id)
    console.log(selectedUserInfo)
  }

  deleteSelectedUser = id => {
    const {usersData} = this.state
    const updatedUsersList = usersData.filter(eachUser => eachUser.id !== id)
    this.setState({usersData: updatedUsersList})
  }

  onSelectAllUsers = event => {
    const {usersData} = this.state
    const allSelectedUserIds = usersData.map(each => each.id)
    console.log(allSelectedUserIds)
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

    // const updateUsersData = usersData.filter(eachUser =>
    //   selectedUsersList.includes(eachUser.id),
    // )
    const updateUsers = usersData.filter(each =>
      selectedUsersList.filter(eachUser => eachUser.id === each),
    )
    console.log(updateUsers)
    // console.log(selectedUsersList)
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
    } = this.state
    const searchRelateUsersData = usersData.filter(
      eachUser =>
        eachUser.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachUser.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachUser.role.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const shouldShowUsersList = searchRelateUsersData.length > 0

    return shouldShowUsersList ? (
      <ul className="users-list-container">
        <li>
          <button type="button" onClick={this.deleteSelectedUserItems}>
            Delete Selected
          </button>
        </li>
        <li className="user-details-list-item">
          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={this.onSelectAllUsers}
              className="checkbox"
            />
          </div>
          <p className="name-title">Name</p>
          <p className="email-title">Email</p>
          <p className="role-title">Role</p>
          <p className="actions-title">Actions</p>
        </li>
        {searchRelateUsersData.map(eachUser => (
          <UserDetailsItem
            key={eachUser.id}
            userFullDetails={eachUser}
            addUserIdIntoSelectedUsersList={this.addUserIdIntoSelectedUsersList}
            removeUserIdFromSelectedUsersList={
              this.removeUserIdFromSelectedUsersList
            }
            selectAllUsers={selectAllUsers}
            selectedUsersList={selectedUsersList}
            deleteSelectedUser={this.deleteSelectedUser}
            editUserInfo={this.editUserInfo}
          />
        ))}
      </ul>
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
    const {selectedUsersList} = this.state
    console.log(selectedUsersList)
    return (
      <div className="all-users-container">
        <h1>All Users List</h1>

        <div className="users-display-container">
          {this.renderSearchInput()}
          {this.renderAllUsersList()}
        </div>
      </div>
    )
  }
}

export default UsersList
