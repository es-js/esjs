import { parser } from 'posthtml-parser'

export function compareDoms(html1: string, html2: string) {
	const tree1 = getTree(html1)
	const tree2 = getTree(html2)

	return compareTrees(tree1, tree2)
}

function compareTrees(tree1: any, tree2: any) {
	const json1 = JSON.stringify(tree1)
	const json2 = JSON.stringify(tree2)

	return json1 === json2
}

function getTree(html: string) {
	return removeContentsThatJustHaveText(
		removeEmptyContent(trimAll(removeEmptySpaces(parser(html)))),
	)
}

function removeContentsThatJustHaveText(node: any): any {
	if (Array.isArray(node)) {
		return node.map(removeContentsThatJustHaveText)
	} else if (typeof node === 'object' && node !== null) {
		if (node.content) {
			node.content = removeContentsThatJustHaveText(node.content)
			if (
				Array.isArray(node.content) &&
				node.content.length === 1 &&
				typeof node.content[0] === 'string'
			) {
				delete node.content
			}
		}
		return node
	}

	return node
}

function trimAll(node: any): any {
	if (Array.isArray(node)) {
		return node.map(trimAll)
	} else if (typeof node === 'object' && node !== null) {
		for (const key in node) {
			node[key] = trimAll(node[key])
		}
		return node
	} else if (typeof node === 'string') {
		return node.trim()
	}

	return node
}

function removeEmptySpaces(node): any {
	if (Array.isArray(node)) {
		return node
			.map((item) => removeEmptySpaces(item))
			.filter((item) => !(typeof item === 'string' && item.trim() === ''))
	} else if (typeof node === 'object' && node !== null) {
		for (const key in node) {
			if (node.hasOwnProperty(key)) {
				node[key] = removeEmptySpaces(node[key])
			}
		}
		return node
	}

	return node
}

function removeEmptyContent(node: any): any {
	if (Array.isArray(node)) {
		return node.map(removeEmptyContent)
	} else if (typeof node === 'object' && node !== null) {
		if (node.content) {
			node.content = removeEmptyContent(node.content)
			if (Array.isArray(node.content) && node.content.length === 0) {
				delete node.content
			}
		}
		return node
	}

	return node
}
