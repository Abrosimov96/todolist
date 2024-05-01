import type {StorybookConfig} from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/\.stories\.jsx?$/], //This is default
                    include: [path.resolve(__dirname, '../src')], // You can specify directories
                },
                loaderOptions: {
                    prettierConfig: {printWidth: 80, singleQuote: false},
                    options: {parser: 'typescript'}
                },
            },
        },
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../public'],
};
export default config;