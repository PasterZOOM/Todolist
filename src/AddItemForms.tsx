import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormsPropsType = {
    addItem: (title: string) => void
}

export const AddItemForms = (props: AddItemFormsPropsType) => {

    const [error, setError] = useState<string | null>(null)
    const [newItemTitle, setNewItemTitle] = useState<string>('')

    const addTask = () => {
        if (newItemTitle.trim() !== '') {
            props.addItem(newItemTitle.trim())
            setNewItemTitle('')
        } else setError('Error')
    }
    const onClickButtonHandler = () => {
        addTask()
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.key === 'Enter' && addTask()
    }

    return <div>
        <input className={error ? 'error' : ''}
               value={newItemTitle}
               onChange={onChangeInputHandler}
               onKeyPress={onKeyPressInputHandler}

        />
        <button onClick={onClickButtonHandler}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>

}