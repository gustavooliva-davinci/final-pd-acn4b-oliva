import { useCallback } from 'react';

export const useToast = () => {

    const showToast = useCallback((message, type = 'info') => {
        
        console.log(`[TOAST - ${type.toUpperCase()}]: ${message}`);
        
    }, []);

    return { showToast };
};