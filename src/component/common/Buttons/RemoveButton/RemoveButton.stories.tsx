import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {RemoveButton} from './RemoveButton';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Todolist/Buttons/RemoveButton',
    component: RemoveButton,
    argTypes: {
        tooltip: {
            defaultValue: 'Remove',
            description: 'Tooltip Text'
        },
        onClick: {
            defaultValue: action('The button has been pressed'),
            description: 'Push button function',
        }
    }
} as ComponentMeta<typeof RemoveButton>

const Template: ComponentStory<typeof RemoveButton> = (args) => <RemoveButton {...args} />

export const RemoveButtonStories = Template.bind({})
RemoveButtonStories.args = {}

