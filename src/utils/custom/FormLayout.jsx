const FormLayout = (props) => {
  const { children, title } = props;
  return (
    <div className="p-3 border rounded bg-white min-h-[90vh]">
      <div className="border h-10 p-2 flex gap-2 justify-between">
        <div>
          <h2>{title}</h2>
        </div>
        <div>Action Components</div>
      </div>
      <div className="border p-2 mt-2">{children}</div>
    </div>
  );
};

export default FormLayout;
