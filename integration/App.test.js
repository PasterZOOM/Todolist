describe('AddButton', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-buttons-addbutton--add-button-stories&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

describe('AddItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-additemforms--add-item-forms-stories&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

describe('EditableSpan', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-stories&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

describe('RemoveButton', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-buttons-removebutton--remove-button-stories&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

describe('Task', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-task--task-not-is-done-stories&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

describe('Todolist', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-todolist--todolist-clear-stories&viewMode=story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})
