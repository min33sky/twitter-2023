import { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
}: Props) {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center
          overflow-y-auto overflow-x-hidden bg-neutral-800 bg-opacity-70
          outline-none focus:outline-none
        "
      >
        <div onClick={handleClose} className="absolute inset-0">
          <p className="sr-only">모달 닫기</p>
        </div>

        <div className="relative mx-auto my-6 h-full w-full lg:h-auto lg:w-3/6 lg:max-w-3xl">
          {/*content*/}
          <div
            className="relative flex h-full w-full flex-col rounded-lg border-0 bg-black shadow-lg
                        first-letter:outline-none focus:outline-none lg:h-auto"
          >
            {/*header*/}
            <div className="flex items-center justify-between rounded-t p-10">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                className="ml-auto border-0 p-1 text-white transition hover:opacity-70"
                aria-label="close modal"
                title="닫기"
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            {/*body*/}
            <div className="relative flex-auto p-10">{body}</div>

            {/*footer*/}
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled}
                label={actionLabel}
                secondary
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
