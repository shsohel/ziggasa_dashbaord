const FormLayout = (props) => {
  const { children, title, actions } = props;
  return (
    <div className="p-3 border rounded bg-white min-h-[90vh]">
      <div className="border h-10 px-2 py-3  flex gap-2 justify-between items-center">
        <div>
          <h2>{title}</h2>
        </div>

        <div>
          {actions.map((action) => {
            return <div key={action.id}>{action.button}</div>;
          })}
        </div>
      </div>
      <div className="border p-2 mt-2">{children}</div>
    </div>
  );
};

export default FormLayout;
