import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Button from "./Button";
import style from "./ButtonWithConfirmation.module.css";
import { FormattedMessage } from "react-intl";


type props = React.ComponentProps<typeof Button>;



export const ButtonWithConfirmation = (props: props) => {
	const { onClick: onSecondClick, children, ...rest } = props;
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const buttonRef = useRef<HTMLButtonElement>(null);

	return <div className={style.button}>
		<Button
			ref={buttonRef}
			{...rest}
			onClick={() => {
				console.log(buttonRef);
				setModalOpen(true);
			}}>
			{children}

		</Button>
		{modalOpen && (<Modal
			openModal={modalOpen}
			buttonClientRect={buttonRef?.current?.getBoundingClientRect()}
			closeModal={() => { setModalOpen(false); }}>
			<div>
				<Button
					className={style['dialog-button']}
					onClick={(evt) => {
						onSecondClick?.(evt);
						setModalOpen(false);
					}}
				>
					<FormattedMessage defaultMessage="Yes" />
				</Button>
				<Button
					className={style['dialog-button']}
					onClick={() => { setModalOpen(false); }}
				>
					<FormattedMessage defaultMessage="No" />
				</Button>

			</div>
		</Modal>)}
	</div >;
};

interface ModalProps {
	openModal: boolean;
	closeModal: () => void;
	buttonClientRect?: DOMRect;
	children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ openModal, closeModal, buttonClientRect, children }) => {

	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (openModal) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
	}, [openModal]);

	const rightPosition = useMemo(() => document.body.getBoundingClientRect().width - (buttonClientRect?.right ?? 0), [buttonClientRect?.right]);

	const dialogStyle = useMemo(() => buttonClientRect ? {
		top: `${buttonClientRect.top}px`,
		right: `${rightPosition}px`,
		left: 'auto',
		height: `${buttonClientRect.height}px`
	} : undefined, [buttonClientRect, rightPosition]);

	return (
		<dialog
			ref={ref}
			className={style.dialog}
			onCancel={closeModal}
			style={dialogStyle}
		>
			<header className={style.header}>
				<FormattedMessage defaultMessage={'Are you sure?'} />
			</header>
			<div className={style.content}>{children}</div>
		</dialog>
	);
};

export default ButtonWithConfirmation;
