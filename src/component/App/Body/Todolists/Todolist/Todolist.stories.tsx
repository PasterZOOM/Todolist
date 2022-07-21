import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {Todolist} from './Todolist'
import {TodoListFilter} from '../todoListsReducer'
import {RequestStatusType} from '../../../appReducer'

export default {
    title: 'Todolist/Todolist',
    component: Todolist,
    argTypes: {
        todoList: {
            defaultValue: {
                title: 'Todolist 1',
                filter: TodoListFilter.ALL,
                id: 'todolistId1',
                order: 1,
                addedDate: '12-12-2012',
                entityStatus: RequestStatusType.IDLE,
            },
            description: 'Todolist',
        },
        tasks: {
            defaultValue: [],
            description: 'Array with tasks'
        },
        disabled: {
            defaultValue: false,
            description: 'Disabled component or not'
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