import { NavLink } from "react-router-dom";
import logo from "../assets/idbi-logo.png";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Transaction Reports", path: "/transactions" },
  { name: "QR Details", path: "/qr-details" },
  { name: "Language Update", path: "/language" },
  { name: "Help & Support", path: "/support" },
];

function Sidebar() {
  return (
    <aside className="h-screen w-[165px] flex-shrink-0 border-r border-[#e5e5e5] bg-white">
      <div className="flex h-[58px] items-center border-b border-[#e5e5e5] px-3">
        <img src={logo} alt="IDBI Logo" className="h-10 w-auto" />
      </div>

      <nav className="pt-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mb-1 flex h-[38px] items-center px-4 text-[12px] transition ${
                isActive
                  ? "border-r-[3px] border-[#1d7de3] bg-[#eef6ff] text-[#1d7de3]"
                  : "text-[#343434] hover:bg-[#f8fafc]"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;