import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export type TSettings = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	bgColor: OptionType;
	contentWidth: OptionType;
}

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settings, setSettings] = useState<TSettings>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		bgColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth
	});

	const applySettings = (settings: TSettings) => {
		setSettings(settings);
	}


	return (
		<div
			className={clsx(styles.main)}
			style={
				{ 
					'--font-family': settings.fontFamily.value,
					'--font-size': settings.fontSize.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm currentSettings={settings} applySettingsFunc={applySettings}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);