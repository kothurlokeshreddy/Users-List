import { React, useEffect, useState } from 'react'

import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    inProgress: 'IN_PROGRESS',
    failure : 'FAILURE'
}

const UserDetail = props => {
    const [userDetails, setUserDetails] = useState()
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

    const { match } = props
    const { params } = match
    const { id } = params

    useEffect(() => {
        if (apiStatus === apiStatusConstants.initial) {
            getUserDetailsById()
        }
    });

    const onClickGoBack = () => {
        const { history } = props
        history.replace('/')
    }

    const getUserDetailsById = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const url = `https://jsonplaceholder.typicode.com/users/${id}`
        const options = {
            method : 'GET'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
            setUserDetails(data)
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
            return ''
        }
    }

    const successView = () => (
        userDetails && (
            <div className="user-detail-container" key = {userDetails.id}>
                <div className="user-details">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-photo" className = "profile-photo"/>
                    <div className="name-basic-details">
                        <h1>{userDetails.name}</h1>
                        <div className="contact-info">
                            <div className="info-item">
                                <span className="label">Email</span>
                                <span className="value">{ userDetails.email }</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Phone</span>
                                <span className="value">{ userDetails.phone }</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Username</span>
                                <span className="value">{ userDetails.username }</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Website</span>
                                <span className="value">{ userDetails.website }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mobile-contact-info">
                    <div className="mobile-info-item">
                        <span className="label">Email: </span>
                        <span className="value">{ userDetails.email }</span>
                    </div>
                    <div className="mobile-info-item">
                        <span className="label">Phone: </span>
                        <span className="value">{ userDetails.phone }</span>
                    </div>
                    <div className="mobile-info-item">
                        <span className="label">Username: </span>
                        <span className="value">{ userDetails.username }</span>
                    </div>
                    <div className="mobile-info-item">
                        <span className="label">Website: </span>
                        <span className="value">{ userDetails.website }</span>
                    </div>
                </div>
                <hr />
                <div className="company-geo-container">
                    <div className="company">
                        <img src="https://static.vecteezy.com/system/resources/previews/006/691/932/non_2x/city-company-urban-building-icon-solid-style-icon-design-element-icon-template-background-free-vector.jpg" alt="company-img" className="company-img" />
                        <div className="company-details">
                            <h2>{userDetails.company.name}</h2>
                            <p>Business Services : {userDetails.company.bs}</p>
                            <p>Tagline : { userDetails.company.catchPhrase}</p>
                        </div>
                    </div>
                    <div className="geo">
                        <div className="geo-details">
                            <h2>{userDetails.address.city}</h2>
                            <p>{userDetails.address.street}, {userDetails.address.suite}, { userDetails.address.zipcode}</p>
                            <p>Latitude : {userDetails.address.geo.lat}, Longitude : { userDetails.address.geo.lng}</p>
                        </div>
                        <img src = "https://static.vecteezy.com/system/resources/previews/014/998/379/non_2x/geo-location-flat-icon-illustration-in-blue-color-for-web-design-print-vector.jpg" alt = "geo" className = "geo-img" />
                    </div>
                </div>
            </div>
        )
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
            <button type = "button" className = "retry-btn" onClick = {() => getUserDetailsById()}>Retry</button>
        </div>
    )

    return (
        <div className = "view-container">
            <div className = "users-details-container">
                <button type = "button" className = "go-back-btn" onClick = {onClickGoBack}> ◄  Go Back </button>
                {renderView()}
            </div>
        </div>
    )
}

export default UserDetail