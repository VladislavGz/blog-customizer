import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm, TSettings } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settings, setSettings] = useState<TSettings>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		bgColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.fontFamilyOption
	})

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm settings={settings} setSettings={setSettings} submitHandler={handleSubmit}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

function handleSubmit() {

}