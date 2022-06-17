import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Table, Empty, Space, Button } from "antd";
import { IWord, WordsListResponse } from "~/types/words";
import { PageLayout } from "../layout/PageLayout";
import { EditableRow } from "../components/shared/EditableTable/EditableRow";
import { EditableCell } from "../components/shared/EditableTable/EditableCell";

const BASE_URL = "http://localhost:4000";

export const WordsPage = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const getAllWords = useCallback(async () => {
    setStatus("loading");

    try {
      const {
        data: { data },
      } = await axios.get<WordsListResponse>(`${BASE_URL}/api/words`);
      setWords(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    getAllWords();
  }, [getAllWords]);

  const removeItem = (id: string) => {
    axios.delete(`${BASE_URL}/api/words/${id}`).then(() => {
      getAllWords();
    });
  };

  const saveItem = async (word: IWord) => {
    const item = await axios.put(`${BASE_URL}/api/words/${word._id}`, word);

    console.log(item);
  };

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
            <a onClick={() => removeItem(record._id)}>Delete</a>
          </Space>
        );
      },
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleAdd = () => {
    const newWord: IWord = {
      _id: Math.random().toString(),
      value: "",
      translations: "",
    };

    setWords([newWord, ...words]);
  };

  const handleSave = (newWord: IWord) => {
    setWords((words) => {
      return words.map((word) => {
        if (word._id === newWord._id) {
          return newWord;
        }

        return word;
      });
    });

    saveItem(newWord);
  };

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
        handleSave,
      }),
    };
  });

  return (
    <PageLayout title="Wocabulary words">
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table<IWord>
        bordered
        size="small"
        loading={["idle", "loading"].includes(status)}
        rowKey="_id"
        dataSource={words}
        components={components}
        rowClassName={() => "editable-row"}
        columns={columns}
        locale={{
          emptyText: (
            <Empty
              description={status === "error" ? "Failed" : "No Data"}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    </PageLayout>
  );
};
