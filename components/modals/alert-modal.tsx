'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
interface AlertModal {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}
export const AlertModal: React.FC<AlertModal> = ({ isOpen, onClose, onConfirm, loading }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return (
        <Modal title="Are you sure?" description="This action can not be undo" isOpen={isOpen} onClose={onClose}>
            <div className="pt-6 space-x-2 flex  items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};
