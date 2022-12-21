import { NavLink } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import styled from "styled-components";

const Nav = () => {
  const navs = [{ icon: <FaHome />, text: "홈", path: "/" }];
  return (
    <div>
      {navs.map((nav) => (
        <NavLink to={nav.path}>
          <NavItem isAc>
            {nav.icon}
            <span>{nav.text}</span>
          </NavItem>
        </NavLink>
      ))}
    </div>
  );
};
const NavItem = styled.div`
  display: flex;
  gap: 14px;
  width: 100px;
  padding: 0 10px;
  &: .active {
    background-color: #ccc;
  }
`;
export default Nav;
