import { Skeleton } from 'antd';

export const CardSkeleton = (props) => {
  const { children } = props;
  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg flex flex-col overflow-hidden">
      <div className="relative aspect-square bg-white group overflow-hidden">
        <Skeleton.Image active className="!w-full !h-full" />
      </div>
      <div className="relative p-3 min-h-20 border-t border-gray-200 overflow-hidden">
        {children || <Skeleton.Input active />}
      </div>
    </div>
  );
};
