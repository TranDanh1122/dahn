import React from 'react';
import { toast } from 'react-toastify';

type Props = {
    children: React.ReactNode;
};

type State = {
    hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        // Không cần thay đổi UI => không set hasError cũng được
        return { hasError: false };
    }

    componentDidCatch(error: Error) {
        alert(1)
        // 👉 Log hoặc toast
        toast.error(`Error : ${error.message}`)
        console.error('Caught by ErrorBoundary:', error);
        // toast.error(error.message); // Nếu dùng react-toastify hoặc tương tự
    }

    render() {
        return this.props.children;
    }

    
}
