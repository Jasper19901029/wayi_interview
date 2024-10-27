import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ConfirmProps = {
  confirmType?: string;
  id: number;
  onConfirm: (id: number) => void;
  onCancel: Dispatch<SetStateAction<boolean>>;
  text: string;
  isOpen: boolean;
};

const ConfirmDelete = ({
  confirmType,
  text,
  onConfirm,
  onCancel,
  isOpen,
  id,
}: ConfirmProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{confirmType}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            確認將任務{text}刪除?
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={async () => {
              onConfirm(id);
            }}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
