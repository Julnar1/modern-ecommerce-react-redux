import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faPhone,
  faMapMarkerAlt,
  faBuilding
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

function Profile() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Please log in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card profile-card">
            <div className="card-body text-center">
              <div className="profile-avatar">
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
              <h3 className="mt-3">{user.firstName} {user.lastName}</h3>
              <p className="text-muted">{user.username}</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Profile Information</h4>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-3">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  <strong>Full Name:</strong>
                </div>
                <div className="col-md-9">
                  {user.firstName} {user.lastName}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-3">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  <strong>Email:</strong>
                </div>
                <div className="col-md-9">
                  {user.email}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-3">
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  <strong>Phone:</strong>
                </div>
                <div className="col-md-9">
                  {user.phone || "Not provided"}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                  <strong>Address:</strong>
                </div>
                <div className="col-md-9">
                  {user.address?.address || "Not provided"}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-3">
                  <FontAwesomeIcon icon={faBuilding} className="me-2" />
                  <strong>Company:</strong>
                </div>
                <div className="col-md-9">
                  {user.company?.name || "Not provided"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 