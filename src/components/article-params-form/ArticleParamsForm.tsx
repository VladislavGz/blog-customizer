import { useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { OnClick } from '../arrow-button/ArrowButton';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, OptionType, ArticleStateType, defaultArticleState } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export type TFormProps = {
	currentSettings: ArticleStateType;
	applySettingsFunc: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ currentSettings, applySettingsFunc }: TFormProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentSettings)

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen
	})

	const handleToggleState: OnClick = () => {
		setIsMenuOpen(!isMenuOpen);
	}

	const handleChange = (type: keyof ArticleStateType) => (selected: OptionType) => {
		setFormState(prevState => ({
			...prevState,
			[type]: selected
		}))
	}

	const handleResetEvent = () => {
		setFormState(defaultArticleState);
		applySettingsFunc(defaultArticleState);
	}

	const handleSubmitEvent = (evt: React.FormEvent) => {
		evt.preventDefault()
		applySettingsFunc(formState);
	}

	const asideCls = clsx({
		[styles.container]: true,
		[styles.container_open]: isMenuOpen
	});

	return (
		<div ref={rootRef}>
			<ArrowButton handleClick={handleToggleState} isOpen={isMenuOpen} />
			<aside className={asideCls}>
				<form className={styles.form} onSubmit={handleSubmitEvent}>
					<Text as={'h2'} weight={800} size={31} uppercase>Задайте параметры</Text>

					<Select title='Шрифт' selected={formState.fontFamilyOption} options={fontFamilyOptions} onChange={handleChange('fontFamilyOption')}></Select>

					<RadioGroup title='Размер шрифта' name='FontSize' selected={formState.fontSizeOption} options={fontSizeOptions} onChange={handleChange('fontSizeOption')} ></RadioGroup>

					<Select title='Цвет шрифта' selected={formState.fontColor} options={fontColors} onChange={handleChange('fontColor')}></Select>

					<Separator></Separator>

					<Select title='Цвет фона' selected={formState.backgroundColor} options={backgroundColors} onChange={handleChange('backgroundColor')}></Select>

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