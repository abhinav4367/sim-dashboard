import React, { useState } from "react";
import styled from "styled-components";

// ✅ Sidebar Collapse Icon as a React Component
const SidebarToggleIcon = ({ collapsed }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      style={{
        transition: "transform 0.3s ease-in-out",
        transform: collapsed ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      <path
        d="M5 5h8v14H5V5Zm14 14h-4V5h4v14ZM4 3c-0.55228 0 -1 0.44772 -1 1v16c0 0.5523 0.44772 1 1 1h16c0.5523 0 1 -0.4477 1 -1V4c0 -0.55228 -0.4477 -1 -1 -1H4Zm3 9 4 -3.5v7L7 12Z"
        strokeWidth="1"
      />
    </svg>
  );
};

// ✅ Styled Components
const SideMenuWrapper = styled.div`
  flex-shrink: 0;
  border-radius: 15px;
  background-color: #333;
  color: #fff;
  width: ${({ collapsed }) => (collapsed ? "50px" : "160px")};
  height: 70vh;
  position: fixed;
  padding: 20px;
  top: 80px;
  left: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 16px;
  transition: width 0.3s ease-in-out;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  transition: opacity 0.2s ease-in-out;
  &:hover {
    background-color: #555;
  }
`;

const MenuLink = styled.a`
  color: #fff;
  text-decoration: none;
`;

// ✅ SideMenu Component
const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SideMenuWrapper collapsed={collapsed}>
      <ToggleButton onClick={() => setCollapsed(!collapsed)}>
        <SidebarToggleIcon collapsed={collapsed} />
      </ToggleButton>
      <MenuList>
        <MenuItem collapsed={collapsed}>
          <MenuLink href="#">{collapsed ? "🎮" : "Play Arena"}</MenuLink>
        </MenuItem>
        <MenuItem collapsed={collapsed}>
          <MenuLink href="#">{collapsed ? "📅" : "Attendance"}</MenuLink>
        </MenuItem>
      </MenuList>
    </SideMenuWrapper>
  );
};

export default SideMenu;
