import type { FormInstance } from "antd/lib/form";
import { createContext } from "react";

export const EditableContext = createContext<FormInstance<any> | null>(null);
