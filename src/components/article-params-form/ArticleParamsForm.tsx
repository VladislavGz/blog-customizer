import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { OnClick } from '../arrow-button/ArrowButton';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TSettings = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	bgColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = () => {
	const formElement = useRef<HTMLFormElement | null>(null);

	const [isOpen, toggleState] = useState(false);
	const [settings, setSettings] = useState<TSettings>({
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		bgColor: backgroundColors[0],
		contentWidth: contentWidthArr[0]
	});

	const handleToggleState: OnClick = () => {
		toggleState(!isOpen);
	}

	const setFontFamily = (newFontFamily: OptionType) => {
		setSettings({ ...settings, fontFamily: newFontFamily});
	}

	const setFontSize = (newFontSize: OptionType) => {
		setSettings({ ...settings, fontSize: newFontSize});
	}

	const setFontColor = (newFontColor: OptionType) => {
		setSettings({ ...settings, fontColor: newFontColor});
	}

	const setBgColor = (newBgColor: OptionType) => {
		setSettings({ ...settings, bgColor: newBgColor});
	}

	const setContentWidth = (newContentWidth: OptionType) => {
		setSettings({ ...settings, contentWidth: newContentWidth});
	}

	const handleResetEvent = () => {

	}

	const handleSubmitEvent = (evt: SubmitEvent) => {
		evt.preventDefault();
		console.log('submit evt')
	}

	useEffect(() => {
		formElement.current?.addEventListener('submit', handleSubmitEvent);

		return () => {
			formElement.current?.removeEventListener('submit', handleSubmitEvent);
		}
	}, []);

	const asideCls = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen
	});

	return (
		<>
			<ArrowButton handleClick={handleToggleState} isOpen={isOpen} />
			<aside className={asideCls}>
				<form className={styles.form} ref={formElement}>
					<Text as={'h2'} weight={800} size={31} uppercase>Задайте параметры</Text>

					<Select title='Шрифт' selected={settings.fontFamily} options={fontFamilyOptions} onChange={setFontFamily} ></Select>

					<RadioGroup title='Размер шрифта' name='FontSize' selected={settings.fontSize} options={fontSizeOptions} onChange={setFontSize}></RadioGroup>

					<Select title='Цвет шрифта' selected={settings.fontColor} options={fontColors} onChange={setFontColor} ></Select>

					<Separator></Separator>

					<Select title='Цвет фона' selected={settings.bgColor} options={backgroundColors} onChange={setBgColor} ></Select>

					<Select title='Ширина контента' selected={settings.contentWidth} options={contentWidthArr} onChange={setContentWidth}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetEvent} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};