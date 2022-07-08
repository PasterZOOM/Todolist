import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {AddItemForms} from './AddItemForms'

export default {
    title: 'Todolist/AddItemForms',
    component: AddItemForms,
    argTypes: {
        itemTitle: {
            defaultValue: 'Item',
            description: 'Item title'
        },
        addItem: {
            defaultValue: action('Trying to add a item'),
            description: 'Function that adds a item',
        }
    }
} as ComponentMeta<typeof AddItemForms>

const Template: ComponentStory<typeof AddItemForms> = (args) => <AddItemForms {...args} />

export const AddItemFormsStories = Template.bind({})
AddItemFormsStories.args = {}
