function DetailRow({ label, value }) {
  return (
    <div className="grid grid-cols-2 gap-4 py-2 text-[13px]">
      <p className="text-[#8a8a8a]">{label}</p>
      <p className="break-words text-[#3b3b3b]">{value || "-"}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4 overflow-hidden rounded border border-[#ececec]">
      <div className="border-b bg-white px-4 py-3">
        <h3 className="text-[14px] font-medium text-[#3a3a3a]">{title}</h3>
      </div>
      <div className="bg-white px-4 py-3">{children}</div>
    </div>
  );
}

function ProfileModal({ onClose, profile }) {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[640px] rounded bg-white shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
        <div className="border-b px-5 py-4">
          <h2 className="text-[16px] font-medium text-[#2f2f2f]">View Profile Details</h2>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-4">
          <Section title="Basic Information">
            <DetailRow label="Name" value={profile.merchant_name} />
            <DetailRow label="Phone" value={profile.merchant_mobile} />
            <DetailRow label="Email" value={profile.merchant_email} />
            <DetailRow label="Merchant ID" value={profile.merchant_id} />
            <DetailRow label="City" value={profile.city} />
            <DetailRow label="State" value={profile.state} />
          </Section>

          <Section title="Device Information">
            <DetailRow label="Device Serial Number" value={profile.serial_number} />
            <DetailRow label="Linked Account Number" value={profile.merchant_account_no} />
            <DetailRow label="UPI ID" value={profile.vpa_id} />
            <DetailRow label="IFSC Code" value={profile.ifsc} />
            <DetailRow label="Device Status" value={profile.device_status} />
            <DetailRow label="Delivery Status" value={profile.device_delivery_status} />
            <DetailRow label="Mapping Status" value={profile.mapping_status} />
            <DetailRow label="Network Type" value={profile.network_type} />
            <DetailRow label="Channel" value={profile.channel} />
            <DetailRow label="QR Type" value={profile.qr_type} />
          </Section>
        </div>

        <div className="flex justify-end border-t px-5 py-4">
          <button
            onClick={onClose}
            className="rounded bg-[#0b69c7] px-4 py-2 text-[13px] font-medium text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;