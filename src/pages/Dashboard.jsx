import { useMemo, useState } from "react";
import { storage } from "../utils/storage";
import VpaSelectionModal from "../components/VpaSelectionModal";

function SummaryCard({ title, value, icon }) {
  return (
    <div className="flex items-center justify-between rounded-[8px] border border-[#ebebeb] bg-white px-4 py-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded bg-[#eef4fb] text-[#2684ff]">
          {icon}
        </div>
        <p className="text-[13px] text-[#565656]">{title}</p>
      </div>

      <p className="text-[18px] font-semibold text-[#2f2f2f]">{value}</p>
    </div>
  );
}

function Dashboard() {
  const initialProfileList = storage.getProfileList();
  const initialSelectedProfile = storage.getSelectedProfile();

  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);
  const [profileList] = useState(initialProfileList);
  const [selectedProfile, setSelectedProfile] = useState(initialSelectedProfile);
  const [showVpaModal, setShowVpaModal] = useState(
    initialProfileList.length > 1 && !initialSelectedProfile?.vpa_id
  );

  const vpaId = useMemo(
    () => selectedProfile?.vpa_id || "-",
    [selectedProfile]
  );

  const handleProceed = (profile) => {
    storage.setSelectedProfile(profile);
    setSelectedProfile(profile);
    setShowVpaModal(false);
  };

  const handleCancel = () => {
    if (selectedProfile?.vpa_id) {
      setShowVpaModal(false);
      return;
    }

    storage.clearAllSession();
    window.location.href = "/";
  };

  return (
    <>
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold text-[#1f1f1f]">
              Dashboard
            </h1>
            <p className="mt-2 text-[14px] text-[#4f4f4f]">ID : {vpaId}</p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-[34px] min-w-[70px] items-center justify-between gap-2 rounded border border-[#dedede] bg-white px-3 text-[12px] text-[#3a3a3a]"
            >
              <span>{selected}</span>
              <span className="text-[10px]">⌄</span>
            </button>

            {open ? (
              <div className="absolute right-0 z-10 mt-2 w-[100px] rounded bg-white py-1 shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
                {[
                  { label: "Today", value: "Today" },
                  { label: "Yesterday", value: "Yesterday" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 px-3 py-2 text-[12px] text-[#3a3a3a] hover:bg-[#f5faff]"
                  >
                    <input
                      type="radio"
                      checked={selected === option.value}
                      onChange={() => {
                        setSelected(option.value);
                        setOpen(false);
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SummaryCard title="Total No Of Transaction" value="20.7K" icon="⇄" />
          <SummaryCard title="Total Amount" value="76,000 cr" icon="💳" />
        </div>
      </div>

      <VpaSelectionModal
        open={showVpaModal}
        profiles={profileList}
        onCancel={handleCancel}
        onProceed={handleProceed}
      />
    </>
  );
}

export default Dashboard;