import { parser } from 'posthtml-parser'
import { render } from 'posthtml-render'
import { getDictionary } from './keywords'

export interface CompileOptions {
	from?: 'eshtml' | 'html'
	to?: 'eshtml' | 'html'
}

export function compile(
	content: string,
	options: CompileOptions = {
		from: 'eshtml',
		to: 'html',
	},
): string {
	try {
		const tree = parser(content)

		const dictionary = getDictionary(options?.to === 'eshtml')

		const newTree = compileTreeRecursive(tree, dictionary)

		const output = render(newTree)

		return output
	} catch (error) {
		console.error({ error })
		return content
	}
}

function compileTreeRecursive(tree: any, dictionary: Map<string, string>) {
	return tree.map((node: any) => {
		if (typeof node === 'string') {
			return node
		}

		const { tag, attrs, content } = node

		if (!tag) {
			return node
		}

		let newTag = tag

		if (dictionary.has(tag.toLowerCase())) {
			newTag = transformTag(tag, dictionary)
		}

		const newAttrs = attrs

		const newContent = content
			? compileTreeRecursive(content, dictionary)
			: null

		return {
			tag: newTag,
			attrs: newAttrs,
			content: newContent,
		}
	})
}

function transformTag(
	tagName: string,
	dictionary: Map<string, string>,
): string {
	return dictionary.get(tagName.toLowerCase()) || tagName
}
