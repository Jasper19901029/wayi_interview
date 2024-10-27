"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import CompletedIcon from "@/components/icons/CompletedIcon";
import UnCompletedIcon from "@/components/icons/UnCompletedIcon";
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { completeAction } from "@/app/actions/CompleteAction";
import ConfirmDelete from "./ConfirmDelete";
import { deleteAction } from "@/app/actions/DeleteAction";
import ConfirmEdit from "./ConfirmEdit";
import { editAction } from "@/app/actions/EditAction";

export type TodoListData = {
  id: number;
  name: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type TodoListProps = {
  data: TodoListData[];
};

const TodoList = ({
  todoData,
  handleComplete,
}: {
  todoData: TodoListData;
  handleComplete: Dispatch<SetStateAction<TodoListData[]>>;
}) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="col-span-4 grid grid-cols-4 gap-5 mt-5 items-center px-5 w-full justify-center text-left">
      <div className="text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"default"}
                size={"sm"}
                onClick={async () => {
                  const updateData = await completeAction(
                    todoData.id,
                    todoData.is_completed,
                    todoData.name
                  );

                  if (updateData) {
                    handleComplete((prev) =>
                      prev.map((todo) =>
                        todo.id === todoData.id ? updateData.data : todo
                      )
                    );
                  }
                }}>
                {todoData.is_completed ? (
                  <CompletedIcon />
                ) : (
                  <UnCompletedIcon />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{todoData.is_completed ? "Completed" : "Not Completed"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className=" text- text-center">{todoData.name}</p>
      <p className=" text- break-words">{todoData.description}</p>
      <div className="flex justify-center space-x-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"default"}
                size={"sm"}
                onClick={() => setIsEdit(!isEdit)}>
                <EditIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"default"}
                size={"sm"}
                onClick={() => setIsDelete(!isDelete)}>
                <DeleteIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {isEdit && (
          <ConfirmEdit
            confirmType={"Edit"}
            dataName={todoData.name}
            dataDescription={todoData.description}
            onConfirm={editAction}
            onCancel={setIsEdit}
            isOpen={isEdit}
            id={todoData.id}
            dataCompleted={todoData.is_completed}
            handleComplete={handleComplete}
          />
        )}
        {isDelete && (
          <ConfirmDelete
            confirmType={"Delete"}
            text={todoData.name}
            onConfirm={deleteAction}
            onCancel={setIsDelete}
            isOpen={isDelete}
            id={todoData.id}
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;
