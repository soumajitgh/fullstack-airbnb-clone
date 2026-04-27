import { PropsWithChildren } from 'react';

export default function DashedBox({ children }: PropsWithChildren) {
  return (
    <div className={'border-4 border-primary bg-red-50 border-dashed rounded-xl p-4 flex flex-col gap-4'}>
      {children}
    </div>
  );
}