import { useState, useRef, useContext, useEffect } from "react";
import type { InputRef } from "antd";
import { Input, Form } from "antd";
import { EditableContext } from "./EditableContext";
import "./EditableCell.css";

interface EditableCellProps<T> {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  className: string;
  dataIndex: keyof T;
  record: T;
  handleSave: (record: T) => void;
}

export const EditableCell = <T extends Object>({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  className,
  ...restProps
}: EditableCellProps<T>) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex as string}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return (
    <td {...restProps} className={`${className} editable-cell`}>
      {childNode}
    </td>
  );
};
