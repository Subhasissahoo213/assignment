import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { storage } from "../utils/storage";

function getDisplayName(profile) {
  return profile?.merchant_name || "User";
}

function getAvatarInitials(name = "User") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Topbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const profile = storage.getSelectedProfile();
  const displayName = useMemo(() => getDisplayName(profile), [profile]);
  const initials = useMemo(() => getAvatarInitials(displayName), [displayName]);

  const handleLogout = () => {
    setOpen(false);
    setShowModal(false);
    storage.clearAllSession();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <header className="flex h-[58px] items-center justify-between border-b border-[#e5e5e5] bg-white px-4">
      <div className="text-[18px] text-[#555555]">☰</div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4aa3ff] text-[12px] font-semibold text-white">
            {initials}
          </div>
          <span className="text-[12px] font-medium text-[#3a3a3a]">
            {displayName}
          </span>
        </button>

        {open ? (
          <div className="absolute right-0 z-20 mt-2 w-32 rounded bg-white py-1 shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
            <button
              type="button"
              className="block w-full px-3 py-2 text-left text-[12px] text-[#333333] hover:bg-[#f7f7f7]"
              onClick={() => {
                setShowModal(true);
                setOpen(false);
              }}
            >
              View Profile
            </button>

            <button
              type="button"
              className="block w-full px-3 py-2 text-left text-[12px] text-[#ef4444] hover:bg-[#f7f7f7]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>

      {showModal ? (
        <ProfileModal profile={profile} onClose={() => setShowModal(false)} />
      ) : null}
    </header>
  );
}

export default Topbar;