import { useRef, useState } from 'react';
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
import { TSettings } from 'src/index';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export type TFormProps = {
	currentSettings: TSettings;
	applySettingsFunc: (settings: TSettings) => void;
}

export const ArticleParamsForm = ({ currentSettings, applySettingsFunc }: TFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isOpen, toggleState] = useState(false);
	const [formState, setFormState] = useState<TSettings>(currentSettings)

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onChange: toggleState
	})

	const handleToggleState: OnClick = () => {
		toggleState(!isOpen);
	}

	const handleChange = (type: keyof TSettings) => (selected: OptionType) => {
		setFormState(prevState => ({
			...prevState,
			[type]: selected
		}))
	}

	const handleResetEvent = () => {
		setFormState(currentSettings);
	}

	const handleSubmitEvent = (evt: React.FormEvent) => {
		evt.preventDefault()
		applySettingsFunc(formState)
	}

	const asideCls = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen
	});

	return (
		<div ref={rootRef}>
			<ArrowButton handleClick={handleToggleState} isOpen={isOpen} />
			<aside className={asideCls}>
				<form className={styles.form} onSubmit={handleSubmitEvent}>
					<Text as={'h2'} weight={800} size={31} uppercase>Задайте параметры</Text>

					<Select title='Шрифт' selected={formState.fontFamily} options={fontFamilyOptions} onChange={handleChange('fontFamily')}></Select>

					<RadioGroup title='Размер шрифта' name='FontSize' selected={formState.fontSize} options={fontSizeOptions} onChange={handleChange('fontSize')} ></RadioGroup>

					<Select title='Цвет шрифта' selected={formState.fontColor} options={fontColors} onChange={handleChange('fontColor')}></Select>

					<Separator></Separator>

					<Select title='Цвет фона' selected={formState.bgColor} options={backgroundColors} onChange={handleChange('bgColor')}></Select>

					<Select title='Ширина контента' selected={formState.contentWidth} options={contentWidthArr} onChange={handleChange('contentWidth')}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetEvent} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};