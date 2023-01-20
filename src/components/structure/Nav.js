import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { FaHome, FaHistory } from "react-icons/fa";
import Row from "../FlexRow";

const Nav = () => {
  const navs = [
    { icon: <FaHome />, text: "홈", path: "/" },
    { icon: <FaHistory />, text: "시청기록", path: "/history" },
  ];
  return (
    <div>
      {navs.map((nav) => (
        <NavItem to={nav.path} key={nav.path}>
          <Row gap={12} align={"center"}>
            {nav.icon}
            <p>{nav.text}</p>
          </Row>
        </NavItem>
      ))}
    </div>
  );
};

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 140px;
  padding: 10px 14px;
  border-radius: 30px;
  &.active {
    background-color: #eee;
  }
`;
export default Nav;
