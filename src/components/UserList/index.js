import { React, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import './index.css'

const apiStatusConstants = {
  initial : 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure : 'FAILURE'
}

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    getUsersList()
  }, []);

  const onChangeSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    const sortedUsers = [...usersList].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name)
      }
      return b.name.localeCompare(a.name)
    })
    setUsersList(sortedUsers)
  }

  const getUsersList = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const url = "https://jsonplaceholder.typicode.com/users";
    const options = {
      method : 'GET'
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      setUsersList(data)
      setApiStatus(apiStatusConstants.success)
      console.log(data)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return successView()
      case apiStatusConstants.inProgress:
        return loaderView()
      case apiStatusConstants.failure:
        return failureView()
      default:
        return null
    }
  }

  const successView = () => (
    <div className="users-container">
      <ul className="users-container-list">
        {filteredUsers.map((user) => (
          <Link to = {`/users/${user.id}`} style = {{textDecoration : 'none'}}>
            <li className = "user-card" key = {user.id}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbEpHD-XOqk_ddpmBIZWoZs4IYhYCTiohq-J-k8nHCSI8Xkc5VZU-1MP9ENdDmS4wUyW8&usqp=CAU" alt="profile" className = "profile-card"/>
              <h5>Name: {user.name}</h5>
              <p>Comapny: {user.company.name}</p>
              <p>{user.website}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )

  const loaderView = () => (
    <div className="wlan-search">
      <div>
        <svg className="top" viewBox="0 0 40 40">
            <path d="M4,14 C9.33333333,10 14.6666667,8 20,8 C25.3333333,8 30.6666667,10 36,14"></path>
        </svg>
        <svg className="middle" viewBox="0 0 40 40">
            <path d="M9,19 C12.6666667,16.3333333 16.3333333,15 20,15 C23.6666667,15 27.3333333,16.3333333 31,19"></path>
        </svg>
        <svg className="bottom" viewBox="0 0 40 40">
            <path d="M13,24 C15.3333333,22.1666667 17.6666667,21.25 20,21.25 C22.3333333,21.25 24.6666667,22.1666667 27,24"></path>
        </svg>
      </div>
    </div>
  )

  const failureView = () => (
    <div className="failure-view">
      <img src="https://www.shutterstock.com/image-vector/astronaut-flying-space-catches-light-260nw-540417052.jpg" alt="failure-msg" />
      <h2>Oops! Something Went Wrong</h2>
      <p>We are unable to process your request. Please try again later.</p>
      <button type = "button" className = "retry-btn" onClick = {() => getUsersList()}>Retry</button>
    </div>
  )

  const filteredUsers = usersList.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      <header>
        <Link to = "/" style = {{textDecoration : 'none', color : '#fff', width : '100px!'}}>
          <div className="logo-box">
            <h1>User List</h1>
          </div>
        </Link>
        <div className="search-filter-container">
          <div className="search-box">
            <input type="text" onChange={onChangeSearch} placeholder = "Enter Username" className="search-input"/>
          </div>
          <div className="filter-container">
            <button className="sort-btn" onClick = {handleSort}>
              sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </div>
          </div>
      </header>
      <div className="mobile-search-box">
        <input type="text" onChange={onChangeSearch} placeholder = "Enter Username" className="search-input"/>
      </div>
      <main>
        {renderView()}
      </main>
    </>
  )
}

export default UserList