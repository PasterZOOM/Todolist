import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        title: {
            defaultValue: 'Item 1',
            description: 'Item title'
        },
        onChange: {
            defaultValue: action('Trying to change title to'),
            description: 'Function that changes the title of the title',
        }
    }
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {}
