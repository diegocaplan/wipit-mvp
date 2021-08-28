const { Task, User, Language } = require('../db.js');

const testSetUp = async () => {
    try {
        const user = await User.create({
            userName: 'daro',
            name: 'Dario',
            lastName: 'Jejer',
            password: '1234',
            email: 'ejemplo1@mail.com'
        });
        const task = await Task.create({
            title: 'Ayuda react',
            description: 'No puedo renderizar un componente',
            status: 'sprint',
            purpose: 'ayuda',
            area: 'front-end',
            difficulty: 'easy',
            minutes: 60,
            author_id: user.id
        });
        const language = await Language.create({
            name: 'Javascript',
            area: "front-end"
        })
        await task.addLanguage(language);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    testSetUp
}