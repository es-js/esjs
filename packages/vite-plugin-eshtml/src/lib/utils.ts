import { compile as EsHTMLCompile } from '@es-js/eshtml'

export function compile(eshtml: string): string {
	return EsHTMLCompile(eshtml, { from: 'eshtml', to: 'html' })
}

export function dfs(keys: string[], value: any, res: Record<string, any>) {
	if (keys.length) {
		const strItem = keys.shift()
		if (!keys.length) {
			res[strItem!] = value
		} else {
			const tmp = res[strItem!] ? res[strItem!] : (res[strItem!] = {})
			dfs(keys, value, tmp)
		}
	}
	return res
}

export function dfs2(
	rebuildData: Record<string, any>,
	key: string,
	value: Record<string, any>,
) {
	const tmp = rebuildData[key] ? rebuildData[key] : (rebuildData[key] = {})
	if (Object.prototype.toString.call(value).slice(8, -1) === 'Object') {
		const nextKey = Object.keys(value)[0]
		dfs2(tmp, nextKey, value[nextKey])
	} else {
		rebuildData[key] = value
	}
}
