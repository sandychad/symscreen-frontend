// React
import React, { Component } from 'react';

// React Router
import { Link, NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrgName, getCities } from '../../../redux/actions/organization';
import {
  getPeople,
  setCity,
  clearCityAndPeople,
} from '../../../redux/actions/people';
import { logout } from '../../../redux/actions/auth';

// React Bootstrap
import { Navbar, Nav, SplitButton, NavDropdown } from 'react-bootstrap';

// Local Components
import CityDropdown from './CityDropdown';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import * as paths from '../../../utils/paths';

// Logo
import logo from './assets/SymScreenLogo.JPG';

// Component
class Header extends Component {
  static propTypes = {
    getOrgName: PropTypes.func.isRequired,
    getCities: PropTypes.func.isRequired,
    setCity: PropTypes.func.isRequired,
    clearCityAndPeople: PropTypes.func.isRequired,
    getPeople: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cities: PropTypes.array.isRequired,
    org_name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  };

  componentDidMount() {
    if (this.props.org_name === '') {
      this.props.getOrgName();
    }

    if (this.props.cities.length === 0) {
      this.props.getCities();
    }
  }

  handleClick(event) {
    const { setCity, getPeople } = this.props;
    const searchCity = event.target.value;

    setCity(searchCity);
    getPeople(searchCity);
  }

  handleLogout() {
    this.props.clearCityAndPeople();
    this.props.logout();
  }

  render() {
    const { org_name, cities, city } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { pathname } = this.props.location;

    return (
      <Navbar bg='primary' variant='dark' expand='sm' fixed='top'>
        <Navbar.Brand as={Link} to={paths.HOME_PATH}>
          <img src={logo} height='30' alt='SymScreen' />
        </Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link as={NavLink} to={paths.ABOUT_PATH}>
            About
          </Nav.Link>
          {user ? (
            <NavDropdown title='App' id='basic-nav-dropdown'>
              {user.role.includes('Location Security') ? (
                <NavDropdown.Item as={NavLink} to={paths.SURVEY_PATH}>
                  Survey
                </NavDropdown.Item>
              ) : null}
              {user.role.includes('COVID Admin') ? (
                <NavDropdown.Item as={NavLink} to={paths.REPORTS_PATH}>
                  Reports
                </NavDropdown.Item>
              ) : null}
              {user.role.includes('System Admin') ? (
                <NavDropdown.Item as={NavLink} to={paths.USER_MANAGEMENT_PATH}>
                  Users
                </NavDropdown.Item>
              ) : null}
            </NavDropdown>
          ) : null}
        </Nav>
        <Navbar.Collapse className='justify-content-end'>
          <SplitButton
            alignRight
            variant='primary'
            title={org_name + ' | ' + (city !== '' ? city : 'Location')}
            disabled={pathname === paths.PEOPLE_SEARCH_PATH ? false : true}
          >
            <CityDropdown
              cities={cities}
              searchCity={city}
              handleClick={(e) => this.handleClick(e)}
            />
          </SplitButton>
          {isAuthenticated ? (
            <LogoutButton handleLogout={() => this.handleLogout()} />
          ) : (
            <LoginButton />
          )}
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  org_name: state.organization.org_name,
  auth: state.auth,
  cities: state.organization.cities,
  city: state.people.city,
});

export default connect(mapStateToProps, {
  getOrgName,
  getPeople,
  getCities,
  setCity,
  clearCityAndPeople,
  logout,
})(Header);
