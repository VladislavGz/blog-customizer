import clsx from 'clsx';

import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';


/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	handleClick: OnClick;
	isOpen: boolean;
}

export const ArrowButton = (props: ArrowButtonProps) => {
	const containerCls = clsx({
		[styles.container]: true,
		[styles.container_open]: props.isOpen
	})

	const imgCls = clsx({
		[styles.arrow]: !props.isOpen,
		[styles.arrow_open]: props.isOpen
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={props.handleClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerCls}>
			<img src={arrow} alt='иконка стрелочки' className={imgCls} />
		</div>
	);
};
