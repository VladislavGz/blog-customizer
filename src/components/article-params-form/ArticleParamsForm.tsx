import { useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { OnClick } from '../arrow-button/ArrowButton';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, toggleState] = useState(false);

	const handleToggleState: OnClick = () => {
		toggleState(!isOpen);
	}

	const handleResetEvent = () => {
		console.log('handler reset')
	}

	const handleSubmitEvent = (evt: React.FormEvent) => {
		evt.preventDefault()
		console.log('handler submit')
	}

	const asideCls = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen
	});

	return (
		<>
			<ArrowButton handleClick={handleToggleState} isOpen={isOpen} />
			<aside className={asideCls}>
				<form className={styles.form} onSubmit={handleSubmitEvent}>
					<Text as={'h2'} weight={800} size={31} uppercase>Задайте параметры</Text>

					<Select title='Шрифт' selected={null} options={fontFamilyOptions} ></Select>

					<RadioGroup title='Размер шрифта' name='FontSize' selected={fontSizeOptions[0]}  options={fontSizeOptions} ></RadioGroup>

					<Select title='Цвет шрифта' selected={null} options={fontColors} ></Select>

					<Separator></Separator>

					<Select title='Цвет фона' selected={null} options={backgroundColors} ></Select>

					<Select title='Ширина контента' selected={null} options={contentWidthArr} ></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetEvent} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};