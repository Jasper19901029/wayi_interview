import AddNewTodo from "@/components/AddNewTodo/AddNewTodo";
import TodoListContainer from "@/components/TodoListContainer/TodoListContainer";
import { type TodoListData } from "@/components/TodoList/TodoList";
import Link from "next/link";

type HomePageProps = {
  searchParams: { page?: string; type?: string };
};

export default async function Home({ searchParams }: HomePageProps) {
  const page = parseInt(searchParams.page || "1");
  const fetchData = await fetch(
    `https://wayi.league-funny.com/api/task?page=${page}&type=${searchParams.type}`,
    {
      cache: "no-store",
      next: { tags: ["get"] },
    }
  );
  const data = await fetchData.json();

  const todoData = data.data.filter((data: TodoListData) => {
    if (searchParams.type === "all" || searchParams.type === undefined) {
      return true;
    }
    if (searchParams.type === "completed") {
      return data.is_completed === true;
    }
    if (searchParams.type === "uncompleted") {
      return data.is_completed === false;
    }
  });

  const total = Math.ceil(data.total / 10);

  const searchType =
    searchParams.type === undefined ? "all" : searchParams.type;
  return (
    <div className="flex flex-col items-center justify-start my-20 py-20 w-[300px] sm:w-[400px] md:w-[600px] mx-auto border-2 border-black/40 rounded-lg">
      <h2 className="text-2xl font-semibold">Todo List</h2>
      <AddNewTodo />

      <TodoListContainer todoData={todoData} page={page} />
      <div className="mt-5 sm:mt-10 sm:space-x-10 space-x-5">
        <Link
          href={
            searchParams.type === undefined
              ? `/?page=${page - 1}`
              : `/?page=${page - 1}&type=${searchType}`
          }
          rel="prev"
          className={`${
            page <= 1 && "pointer-events-none cursor-none"
          } hover:bg-black hover:text-white px-2 py-1 rounded-lg`}>
          Previous
        </Link>

        {Array.from({ length: total }, (_, i) => (
          <Link
            href={
              searchParams.type === undefined
                ? `/?page=${i + 1}`
                : `/?page=${i + 1}&type=${searchType}`
            }
            key={i}
            className={`${
              page === i + 1 &&
              "pointer-events-none cursor-none underline  bg-gray-300/50 "
            } hover:bg-black hover:text-white px-2 py-1 rounded-full`}>
            {i + 1}
          </Link>
        ))}

        <Link
          href={
            searchParams.type === undefined
              ? `/?page=${page + 1}`
              : `/?page=${page + 1}&type=${searchType}`
          }
          rel="next"
          className={`${
            page === total && "pointer-events-none cursor-none"
          } hover:bg-black hover:text-white px-2 py-1 rounded-lg`}>
          Next
        </Link>
      </div>
    </div>
  );
}
