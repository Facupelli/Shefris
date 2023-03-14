import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

export default function Modal({ children, isOpen, handleClose }: Props) {
  return (
    <>
      <dialog
        open={isOpen}
        className="fixed top-1/2 z-30 -translate-y-1/2 rounded bg-white p-4 font-dosis shadow sm:p-8"
      >
        <div className="flex justify-end font-bold">
          <button type="button" onClick={handleClose}>
            XX
          </button>
        </div>
        {children}
      </dialog>
      <div className="fixed z-20 h-screen w-full bg-neutral-800 opacity-50" />
    </>
  );
}
