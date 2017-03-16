import faker from "faker"

const info = {
	title: "Redux Boilerplate",
	copy: "Gabriela Seabra"
}

const posts = []

for(let i = 0; i < 3; ++i) {
	const title = faker.lorem.words()
	const id = faker.helpers.slugify(title)

	posts.push({
		description: faker.lorem.paragraph(),
		content: `<p>${faker.lorem.paragraphs(3, "</p>\n<p>")}</p>`,
		title,
		id
	})
}

export default {
	info,
	posts
}
