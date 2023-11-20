import { Button } from "../../../../utils/custom/Button";
import FormLayout from "../../../../utils/custom/FormLayout";

const Blogs = () => {
  const actions = [
    {
      id: "1",
      name: "new-button",
      button: (
        // <button className="border p-1 text-sm font-semibold bg-primary">
        //   Add New
        // </button>
        <Button id="new-button" name="New" />
      ),
    },
  ];
  return (
    <FormLayout title="Blogs" actions={actions}>
      <div>List</div>
    </FormLayout>
  );
};

export default Blogs;
