import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {Task} from './Task'
import {TaskStatuses} from '../../../../../../api/api'

export default {
    title: 'Todolist/Task',
    component: Task,
    argTypes: {
        title: {
            defaultValue: 'Task 1',
            description: 'Task name'
        },
        isDone: {
            defaultValue: false,
            description: 'Task status',
        },
        removeTask: {
            defaultValue: action('Trying to remove task'),
            description: 'A function that removes a task from the list'
        },
        changeTaskStatus: {
            defaultValue: action('Trying to change isDone'),
            description: 'Function that changes the status of a task'
        },
        changeTaskTitle: {
            defaultValue: action('Trying to change title to'),
            description: 'Function that changes the title of the task'
        }
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskNotIsDoneStories = Template.bind({});
TaskNotIsDoneStories.args = {
    status: TaskStatuses.New
}

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    status: TaskStatuses.New
}
