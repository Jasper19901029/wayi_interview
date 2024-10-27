"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddNewTodoForm from "./AddNewTodoForm";
import { addAction } from "@/app/actions/AddAction";

const AddNewTodo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex items-center pl-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"default"}
              size={"default"}
              onClick={() => {
                setIsOpen(!isOpen);
              }}>
              Add New Todo
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add New Todo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AddNewTodoForm
        isOpen={isOpen}
        onCancel={setIsOpen}
        onConfirm={addAction}
      />
    </div>
  );
};

export default AddNewTodo;
