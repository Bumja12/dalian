import { CopyIcon } from "@/components/icons";

interface CopyButtonProps {
  copyText: string;
}

export default function CopyButton({ copyText }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).then();
    // TODO: toast 구현
    // toast.success("복사되었습니다.");
  };

  return (
    <div className="flex h-6 w-8 items-center justify-center">
      <button
        type="button"
        className="flex h-full w-full items-center justify-center rounded-md p-0 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onClick={handleCopy}
      >
        <CopyIcon className="h-5 w-5" style={{ color: "#374151" }} />
      </button>
    </div>
  );
}
