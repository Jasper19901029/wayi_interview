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
import { TodoListData } from "@/components/TodoList/TodoList";
import { formSchema } from "@/app/schema/formSchema";

type AddNewTodoFormProps = {
  onCancel: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onConfirm: (
    name: string,
    is_completed: boolean,
    description: string
  ) => Promise<TodoListData>;
};
//   handleComplete: Dispatch<SetStateAction<TodoListData[]>>;

const AddNewTodoForm = ({
  isOpen,
  onCancel,
  onConfirm,
}: AddNewTodoFormProps) => {
  const [fields, setFields] = useState<{
    name: string;
    description: string;
    is_completed: boolean;
  }>({
    name: "",
    description: "",
    is_completed: false,
  });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
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
    await onConfirm(fields.name, fields.is_completed, fields.description);

    onCancel(false);
    setFields({
      name: "",
      description: "",
      is_completed: false,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onCancel(false);
        setFields({
          name: "",
          description: "",
          is_completed: false,
        });
        setErrorMessages([]);
      }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
          {errorMessages.length > 0 && (
            <div className="text-red-500">
              {errorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTodoForm;
