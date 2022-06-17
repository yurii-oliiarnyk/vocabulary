import { Table, Empty, Space } from "antd";
import { IWord } from "~/types/words";
import { API_AGENT_STATUS } from "../../types/api";
import { EditableCell } from "../shared/EditableTable/EditableCell";
import { EditableRow } from "../shared/EditableTable/EditableRow";

type WordsListProps = {
  words: IWord[];
  status: API_AGENT_STATUS;
  removeItem: (id: string) => void;
  saveItem: (word: IWord) => void;
};

export const WordsList = ({ words, status, removeItem, saveItem }: WordsListProps) => {
  const defaultColumns = [
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      editable: true,
      width: "40%",
    },
    {
      title: "Translations",
      dataIndex: "translations",
      key: "translations",
      editable: true,
      width: "40%",
    },
    {
      title: "Controls",
      key: "controls",
      width: "20%",
      render: (_: any, record: IWord) => {
        return (
          <Space size="middle">
            <button onClick={() => removeItem(record._id)}>Delete</button>
          </Space>
        );
      },
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: IWord) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: saveItem,
      }),
    };
  });

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <Table<IWord>
      bordered
      size="small"
      loading={[API_AGENT_STATUS.IDLE, API_AGENT_STATUS.LOADING].includes(status)}
      rowKey="_id"
      dataSource={words}
      components={components}
      rowClassName={() => "editable-row"}
      columns={columns}
      locale={{
        emptyText: (
          <Empty
            description={status === API_AGENT_STATUS.ERROR ? "Failed" : "No Data"}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ),
      }}
    />
  );
};
