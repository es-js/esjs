import { parser } from 'posthtml-parser'
import { transformAttr } from './attrs'
import { render } from './render'
import { getDictionary } from './tags'

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

		const newTree = compileTreeRecursive(tree, dictionary, options)

		return render(newTree)
	} catch (error) {
		console.error({ error })
		return content
	}
}

function compileTreeRecursive(
	tree: any,
	dictionary: Map<string, string>,
	options: CompileOptions,
): any {
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

		const htmlTag = options?.to === 'html' ? newTag : tag

		const newAttrs = transformAttrs(htmlTag, attrs, options)

		const newContent = content
			? compileTreeRecursive(content, dictionary, options)
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

function transformAttrs(
	tagName: string,
	attrs: any,
	options: CompileOptions,
): any {
	if (!attrs) {
		return attrs
	}

	const newAttrs = {}

	for (const key in attrs) {
		const newKey = transformAttr(tagName, key, options)
		// @ts-ignore
		newAttrs[newKey] = attrs[key]
	}

	return newAttrs
}
