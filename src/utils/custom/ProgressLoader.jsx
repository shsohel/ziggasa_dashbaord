const ProgressLoader = (props) => {
  const { children, isProgress } = props;
  return (
    <div>
      {isProgress && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black opacity-80">
          <div className=" mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-white border-t-danger ease-linear"></div>
          <h2 className="animate-pulse text-center text-xl font-semibold text-white">
            Wait...
          </h2>
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};

export default ProgressLoader;
