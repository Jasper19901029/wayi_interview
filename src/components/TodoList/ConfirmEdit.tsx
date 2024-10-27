import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TodoListData } from "./TodoList";
import { formSchema } from "@/app/schema/formSchema";

type ConfirmProps = {
  confirmType?: string;
  id: number;
  onConfirm: (
    id: number,
    name: string,
    is_completed: boolean,
    description: string
  ) => Promise<{ data: TodoListData }>;
  onCancel: Dispatch<SetStateAction<boolean>>;
  dataName: string;
  dataDescription: string;
  isOpen: boolean;
  dataCompleted: boolean;
  handleComplete: Dispatch<SetStateAction<TodoListData[]>>;
};

const ConfirmEdit = ({
  confirmType,
  dataName,
  dataDescription,
  onConfirm,
  onCancel,
  isOpen,
  id,
  dataCompleted,
  handleComplete,
}: ConfirmProps) => {
  const [fields, setFields] = useState<{
    name: string;
    description: string;
    is_completed: boolean;
  }>({
    name: dataName,
    description: dataDescription,
    is_completed: dataCompleted,
  });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleConfirm = async () => {
    const safeParse = formSchema.safeParse({
      missionName: fields.name,
      missionDescription: fields.description,
      missionCompleted: false,
    });
    if (!safeParse.success) {
      const error = safeParse.error.errors;
      const errorMessages = error.map((error) => error.message);
      return setErrorMessages(errorMessages);
    }
    const result = await onConfirm(
      id,
      fields.name,
      fields.is_completed,
      fields.description
    );
    onCancel(false);
    handleComplete((prev) =>
      prev.map((todo) => (todo.id === id ? result.data : todo))
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{confirmType}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {confirmType === "Edit" && (
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">
                任務名稱
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={fields.name}
                  max={10}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 ml-3"
                  placeholder="Edit description"
                />
              </label>
              <label htmlFor="description">
                任務描述
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={fields.description}
                  max={30}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 ml-3"
                  placeholder="Edit description"
                />
              </label>
            </div>
          )}
          {errorMessages.length > 0 && (
            <div className="text-red-500">
              {errorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmEdit;
