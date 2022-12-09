import { Dispatch, ReactNode, SetStateAction } from "react";

const Modal = (props: {
    title: string;
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
    onButtonClick: () => void;
}) => {
    return (
        <div
            className="modal"
            style={{ display: props.isShow ? "flex" : "none" }}
            onMouseDown={() => {
                props.setIsShow(false);
                props.onButtonClick();
            }}
        >
            <div
                className="modal-back"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="modal-header">{props.title}</div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <button
                        className="modal-button"
                        onClick={() => {
                            props.setIsShow(false);
                            props.onButtonClick();
                        }}
                    >
                        確認
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Modal;
