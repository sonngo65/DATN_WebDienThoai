import { FaRegBell } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import Dropdown from "../../Dropdown";
import { useState } from "react";
interface NavbarProps {
  title: string;
}
export default function Navbar({ title }: NavbarProps) {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light bg-white d-flex justify-content-between align-items-center px-4">
      {/* <!-- Left navbar links --> */}
      <div className="title">
        <h5 className="m-0 p-0">{title}</h5>
      </div>

      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">
        {/* <!-- Navbar Search --> */}

        {/* <!-- Messages Dropdown Menu --> */}
        <li className="nav-item dropdown ms-3">
          <Dropdown Icon={IoMailOutline}>
            <a href="#" className="dropdown-item ">
              {/* <!-- Message Start --> */}
              <div className="media">
                <img
                  src="dist/img/user1-128x128.jpg"
                  alt="User Avatar"
                  className="img-size-50 mr-3 img-circle"
                />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Brad Diesel
                    <span className="float-right text-sm text-danger">
                      <i className="fas fa-star"></i>
                    </span>
                  </h3>
                  <p className="text-sm">Call me whenever you can...</p>
                  <p className="text-sm text-muted">
                    <i className="far fa-clock mr-1"></i> 4 Hours Ago
                  </p>
                </div>
              </div>
              {/* <!-- Message End --> */}
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item ">
              {/* <!-- Message Start --> */}
              <div className="media">
                <img
                  src="dist/img/user8-128x128.jpg"
                  alt="User Avatar"
                  className="img-size-50 img-circle mr-3"
                />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    John Pierce
                    <span className="float-right text-sm text-muted">
                      <i className="fas fa-star"></i>
                    </span>
                  </h3>
                  <p className="text-sm">I got your message bro</p>
                  <p className="text-sm text-muted">
                    <i className="far fa-clock mr-1"></i> 4 Hours Ago
                  </p>
                </div>
              </div>
              {/* <!-- Message End --> */}
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item ">
              {/* <!-- Message Start --> */}
              <div className="media">
                <img
                  src="dist/img/user3-128x128.jpg"
                  alt="User Avatar"
                  className="img-size-50 img-circle mr-3"
                />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Nora Silvester
                    <span className="float-right text-sm text-warning">
                      <i className="fas fa-star"></i>
                    </span>
                  </h3>
                  <p className="text-sm">The subject goes here</p>
                  <p className="text-sm text-muted">
                    <i className="far fa-clock mr-1"></i> 4 Hours Ago
                  </p>
                </div>
              </div>
              {/* <!-- Message End --> */}
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item dropdown-footer">
              See All Messages
            </a>
          </Dropdown>
        </li>
        {/* <!-- Notifications Dropdown Menu --> */}
        <li className="nav-item dropdown ms-3">
          <Dropdown Icon={FaRegBell}>
            <span className="dropdown-item dropdown-header">
              15 Notifications
            </span>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-envelope mr-2"></i> 4 new messages
              <span className="float-right text-muted text-sm">3 mins</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-users mr-2"></i> 8 friend requests
              <span className="float-right text-muted text-sm">12 hours</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-file mr-2"></i> 3 new reports
              <span className="float-right text-muted text-sm">2 days</span>
            </a>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item dropdown-footer">
              See All Notifications
            </a>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
}
