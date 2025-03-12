import TableTemplate from "../components/tables/tableTemplate";
import { getAllData } from "@/utils/dbAPI";
import { useEffect, useState } from "react";

interface iData {
  name: string;
  age: number;
  gpa: number;
  month: string;
}

const elements = () => {
  const [columns, setData] = useState<iData | any>([]);

  // get data from api
  useEffect(() => {
    async function getAll() {
      let result = await getAllData();
      setData(result);
    }
    getAll();
  }, []);

  const rows = [
    {name:"Id"},
    {name: "Name"},
    {name: "Age"},
    {name: "Gpa"},
  ]

  return (
    <>
      <div>elements</div>
      <TableTemplate rows={rows} columns={columns} />
    </>
  );
};

export default elements;
