interface AlertProps {
    type: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    message: string;
    onClose?: () => void;
}
export declare function Alert({ type, title, message, onClose }: AlertProps): import("react/jsx-runtime").JSX.Element;
export {};
