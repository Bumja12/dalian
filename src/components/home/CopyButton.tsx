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
        className="pressable h-full w-full p-0"
        onClick={handleCopy}
      >
        <CopyIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
