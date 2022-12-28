import { NavLink } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import styled from "styled-components";

const Nav = () => {
  const navs = [{ icon: <FaHome />, text: "홈", path: "/" }];
  return (
    <div>
      {navs.map((nav) => (
        <NavItem to={nav.path} key={nav.path}>
          {nav.icon}
          <span>{nav.text}</span>
        </NavItem>
      ))}
    </div>
  );
};

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 84px;
  padding: 10px 20px;
  border-radius: 30px;
  &.active {
    background-color: #eee;
  }
`;
export default Nav;
