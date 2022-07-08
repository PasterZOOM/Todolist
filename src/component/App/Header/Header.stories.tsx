import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Header} from './Header';

export default {
    title: 'Todolist/Header',
    component: Header,
    argTypes: {
        header:{
            description: 'Header component'
        }
    },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header/>;

export const HeaderStories = Template.bind({});
HeaderStories.args = {}
