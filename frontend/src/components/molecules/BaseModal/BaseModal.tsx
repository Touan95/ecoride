import React, { useEffect } from 'react';

import clsxm from '@/utils/clsxm';
import { TbX } from 'react-icons/tb';

type Props = {
  isOpen: boolean;
  children?: React.ReactNode | React.ReactNode[];
  maxWidth?: 'fit' | 'lg' | 'xl' | 'xxl' | 'full';
  onCloseClick?: () => void;
  closeOnOutsideClick?: boolean;
  overflowVisible?: boolean;
  requiredLabel?: boolean;
};

export const BaseModal = ({
  children,
  isOpen,
  closeOnOutsideClick = true,
  maxWidth = 'xl',
  onCloseClick,
  overflowVisible = false
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && onCloseClick) {
        onCloseClick();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onCloseClick]);

  const handleCloseClick = () => {
    if (closeOnOutsideClick && onCloseClick) {
      onCloseClick();
    }
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-gray-400/80 backdrop-blur-[1px] flex justify-center items-center z-[999] py-20"
      onClick={handleCloseClick}
    >
      <div
        className={clsxm('block bg-primary-100 h-fit rounded-xl backdrop-blur-md relative max-h-screen overflow-y-auto scroll-hidden', {
          'overflow-y-auto': isOpen,
          'w-fit': maxWidth === 'fit',
          'w-[550px]': maxWidth === 'lg',
          'w-[800px]': maxWidth === 'xl',
          'w-[1200px]': maxWidth === 'xxl',
          'w-full': maxWidth === 'full',
          'overflow-visible': overflowVisible
        })}
        onClick={stopPropagation}
      >
        {onCloseClick && (
          <button
            className="absolute top-4 right-4 flex justify-center items-center w-[32px] h-[32px] cursor-pointer"
            onClick={handleCloseClick}
            type="button"
          >
            <TbX className="text-primary-900" size={50} />
          </button>
        )}

        <div className="px-10 pt-[50px] pb-[20px] m-auto flex flex-col justify-center">{children}</div>
      </div>
    </div>
  );
};
