import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export default function EmptyCard({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={classNames('bg-base-200 animate-fade-in flex-col w-full flex justify-center gap-8 items-center text-gray-500 rounded-xl', className)}>
      {children}
    </div>
  );
}