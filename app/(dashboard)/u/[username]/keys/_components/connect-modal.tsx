"use client";

import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

export const ConnectModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='primary'>
                    Generate connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate connection</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}