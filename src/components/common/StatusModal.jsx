import Button from "./Button";

function StatusModal({ open, title, message, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[335px] rounded-[4px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
        <div className="px-6 pt-5 text-center">
          <h3 className="text-[16px] font-normal leading-6 text-[#2f2f2f]">
            {title}
          </h3>

          {message ? (
            <p className="mt-1 text-[14px] text-[#2f2f2f]">{message}</p>
          ) : null}

          <div className="mx-auto mt-5 flex h-[82px] w-[82px] items-center justify-center rounded-full border-[5px] border-[#d9f2dd] bg-[#35c85a]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              className="h-10 w-10"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="p-4">
          <Button onClick={onClose} className="h-[40px] w-full rounded-[3px]">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;