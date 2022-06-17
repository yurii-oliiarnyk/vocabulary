import { Space, Form, Input, Button } from "antd";
import { IWord } from "~/types/words";

type CreateWordProps = {
  createItem: (item: Omit<IWord, "_id">) => void;
};

export const CreateWord = ({ createItem }: CreateWordProps) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    createItem(form.getFieldsValue(["value", "translations"]));
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
        <Form.Item name="value" rules={[{ required: true, message: "Value is required" }]}>
          <Input placeholder="Value" />
        </Form.Item>
        <Form.Item
          name="translations"
          rules={[{ required: true, message: "Translations is required" }]}
        >
          <Input placeholder="Translations" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
