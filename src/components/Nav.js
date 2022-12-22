import { NavLink } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import styled from "styled-components";

const Nav = () => {
  const navs = [{ icon: <FaHome />, text: "홈", path: "/" }];
  return (
    <div>
      {navs.map((nav) => (
        <NavItem to={nav.path}>
          {nav.icon}
          <span>{nav.text}</span>
        </NavItem>
      ))}
    </div>
  );
};

const NavItem = styled(NavLink)`
  display: flex;
  gap: 14px;
  width: 64px;
  padding: 10px;
  border-radius: 30px;
  &.active {
    background-color: #ccc;
  }
`;
export default Nav;
