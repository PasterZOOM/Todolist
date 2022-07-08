import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Todolist} from './Todolist';
import { TodoListFilter } from '../todoListsReducer';

export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    argTypes: {
        title: {
            defaultValue: 'Todolist 1',
            description: 'Todolist name',
        },
        filter: {
            defaultValue: TodoListFilter.ALL,
            description: 'Filter value'
        },
        todolistId: {
            defaultValue: 'todolistId1',
            description: 'Identification number'
        },
        tasks: {
            defaultValue: [],
            description: 'Array with tasks'
        },
        removeTodolist: {
            defaultValue: action('Trying to remove todolist'),
            description: 'Function that deletes the todolist'
        },
        changeTodolistTitle: {
            defaultValue: action('Trying to change the title of todolist to'),
            description: 'Function that changes the todolist title'
        },
        changeTodolistFilter: {
            defaultValue: action('Trying to change the filter of todolist to'),
            description: 'Function that changes the todolist filter'
        },
        addTask: {
            defaultValue: action('Trying to add a task'),
            description: 'Function that adds a task'
        }
    }
} as ComponentMeta<typeof Todolist>

const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />

export const TodolistClearStories = Template.bind({})
TodolistClearStories.args = {}
