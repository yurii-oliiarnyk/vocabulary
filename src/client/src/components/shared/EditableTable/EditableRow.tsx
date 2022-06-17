import { Form } from "antd";
import { EditableContext } from "./EditableContext";
import "./EditableRow.css";

interface EditableRowProps {
  index: number;
}

export const EditableRow = ({ index, ...props }: EditableRowProps) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
