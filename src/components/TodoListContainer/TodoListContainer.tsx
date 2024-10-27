"use client";
import React, { useState, useEffect } from "react";
import TodoList, { type TodoListData } from "@/components/TodoList/TodoList";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TodoListContainer = ({
  todoData,
}: {
  todoData: TodoListData[];
  page: number;
}) => {
  const [data, setData] = useState<TodoListData[]>(todoData);
  const params = useSearchParams();
  const type = params.get("type");

  useEffect(() => {
    setData(todoData);
  }, [todoData]);

  return (
    <div className="w-full h-full flex flex-col mt-5">
      <div className="w-full h-[50px] space-x-2 pl-2 sm:space-x-10 sm:pl-10">
        {/* <Link href={`/?page=${page ? page : 1}&type=all`}>All</Link> */}
        <Link
          href={`/?type=all`}
          className={`px-2 py-1 hover:bg-black hover:text-white rounded-lg ${
            (type === null || type === "all") &&
            "bg-gray-300 pointer-events-none "
          }`}>
          All
        </Link>

        <Link
          href={`/?type=completed`}
          className={`px-2 py-1 hover:bg-black hover:text-white rounded-lg ${
            type === "completed" && "bg-gray-300 pointer-events-none "
          }`}>
          Completed
        </Link>

        <Link
          href={`/?type=uncompleted`}
          className={`px-2 py-1 hover:bg-black hover:text-white rounded-lg ${
            type === "uncompleted" && "bg-gray-300 pointer-events-none "
          }`}>
          Not Completed
        </Link>
      </div>

      {data.map((data: TodoListData) => (
        <TodoList key={data.id} handleComplete={setData} todoData={data} />
      ))}
    </div>
  );
};

export default TodoListContainer;
