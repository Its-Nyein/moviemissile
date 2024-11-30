const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
      <div className="w-40 md:w-48 h-72 bg-gray-300 rounded-md"></div>
      <div className="w-32 h-6 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonLoader;
