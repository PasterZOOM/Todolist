import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {action} from '@storybook/addon-actions';
import {AddButton} from 'common/components/Buttons/AddButton/AddButton'

export default {
    title: 'TodoList/Buttons/AddButton',
    component: AddButton,
    argTypes: {
        itemTitle: {
            defaultValue: 'item',
            description: 'Tooltip Text("Add + itemTitle")'
        },
        addItemValue: {
            defaultValue: action('The button has been pressed'),
            description: 'Push button function',
        }
    }
} as ComponentMeta<typeof AddButton>

const Template: ComponentStory<typeof AddButton> = (args) => <AddButton {...args} />

export const AddButtonStories = Template.bind({})
AddButtonStories.args = {}

