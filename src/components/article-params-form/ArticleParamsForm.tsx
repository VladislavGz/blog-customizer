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
	const [selectedFontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [selectedFontSize, setFontSize] = useState(fontSizeOptions[0]);
	const [selectedFontColor, setFontColor] = useState(fontColors[0]);
	const [selectedBgColor, setBgColor] = useState(backgroundColors[0]);
	const [selectedContentWidth, setContentWidth] = useState(contentWidthArr[0]);

	const handleToggleState: OnClick = () => {
		toggleState(!isOpen);
	}

	const asideCls = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen
	});

	return (
		<>
			<ArrowButton handleClick={handleToggleState} isOpen={isOpen} />
			<aside className={asideCls}>
				<form className={styles.form}>
					<Text as={'h2'} weight={800} size={31} uppercase>Задайте параметры</Text>

					<Select title='Шрифт' selected={selectedFontFamily} options={fontFamilyOptions} onChange={setFontFamily} ></Select>

					<RadioGroup title='Размер шрифта' name='FontSize' selected={selectedFontSize} options={fontSizeOptions} onChange={setFontSize}></RadioGroup>

					<Select title='Цвет шрифта' selected={selectedFontColor} options={fontColors} onChange={setFontColor} ></Select>

					<Separator></Separator>

					<Select title='Цвет фона' selected={selectedBgColor} options={backgroundColors} onChange={setBgColor} ></Select>

					<Select title='Ширина контента' selected={selectedContentWidth} options={contentWidthArr} onChange={setContentWidth}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};