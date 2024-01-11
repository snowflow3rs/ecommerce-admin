'use client';
import StoreModal from '@/components/modals/store-modal';
import { useEffect, useState } from 'react';

import React from 'react';

const ModalProvider = () => {
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <StoreModal />
        </>
    );
};

export default ModalProvider;
