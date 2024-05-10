import { runCommand } from 'citty'
import { consola } from 'consola'
import { colors } from 'consola/utils'

export class CLIError extends Error {
	constructor(message, code = '') {
		super(message)
		this.name = 'CLIError'
	}
}

export function resolveValue(input) {
	return typeof input === 'function' ? input() : input
}

export function resolveArgs(argsDef) {
	const args = []
	for (const [name, argDef] of Object.entries(argsDef || {})) {
		args.push({
			...argDef,
			name,
			alias: toArray(argDef.alias),
		})
	}
	return args
}

export function formatLineColumns(lines, linePrefix = '') {
	const maxLength = []
	for (const line of lines) {
		for (const [i, element] of line.entries()) {
			maxLength[i] = Math.max(maxLength[i] || 0, element.length)
		}
	}
	return lines
		.map((l) =>
			l
				.map(
					(c, i) =>
						linePrefix + c[i === 0 ? 'padStart' : 'padEnd'](maxLength[i]),
				)
				.join('  '),
		)
		.join('\n')
}

export async function resolveSubCommand(cmd, rawArgs, parent) {
	const subCommands = await resolveValue(cmd.subCommands)
	if (subCommands && Object.keys(subCommands).length > 0) {
		const subCommandArgIndex = rawArgs.findIndex((arg) => !arg.startsWith('-'))
		const subCommandName = rawArgs[subCommandArgIndex]
		const subCommand = await resolveValue(subCommands[subCommandName])
		if (subCommand) {
			return resolveSubCommand(
				subCommand,
				rawArgs.slice(subCommandArgIndex + 1),
				cmd,
			)
		}
	}
	return [cmd, parent]
}

export function toArray(val) {
	if (Array.isArray(val)) {
		return val
	}
	return val === undefined ? [] : [val]
}

export async function renderUsage(cmd, parent) {
	const cmdMeta = await resolveValue(cmd.meta || {})
	const cmdArgs = resolveArgs(await resolveValue(cmd.args || {}))
	const parentMeta = await resolveValue(parent?.meta || {})

	const commandName = `${parentMeta.name ? `${parentMeta.name} ` : ''}${
		cmdMeta.name || process.argv[1]
	}`

	const argLines = []
	const posLines = []
	const commandsLines = []
	const usageLine = []

	for (const arg of cmdArgs) {
		if (arg.type === 'positional') {
			const name = arg.name.toUpperCase()
			const isRequired = arg.required !== false && arg.default === undefined
			// (isRequired ? " (required)" : " (optional)"
			const defaultHint = arg.default ? `="${arg.default}"` : ''
			posLines.push([
				`\`${name}${defaultHint}\``,
				arg.description || '',
				arg.valueHint ? `<${arg.valueHint}>` : '',
			])
			usageLine.push(isRequired ? `<${name}>` : `[${name}]`)
		} else {
			const isRequired = arg.required === true && arg.default === undefined
			const argStr =
				(arg.type === 'boolean' && arg.default === true
					? [
							...(arg.alias || []).map((a) => `--no-${a}`),
							`--no-${arg.name}`,
						].join(', ')
					: [...(arg.alias || []).map((a) => `-${a}`), `--${arg.name}`].join(
							', ',
						)) +
				(arg.type === 'string' && (arg.valueHint || arg.default)
					? `=${
							arg.valueHint ? `<${arg.valueHint}>` : `"${arg.default || ''}"`
						}`
					: '') +
				(arg.type === 'enum' && arg.options
					? `=<${arg.options.join('|')}>`
					: '')
			const isNegative = arg.type === 'boolean' && arg.default === true
			const description = isNegative
				? arg.negativeDescription || arg.description
				: arg.description
			argLines.push([
				`\`${argStr}${isRequired ? ' (required)' : ''}\``,
				description || '',
			])
			if (isRequired) {
				usageLine.push(argStr)
			}
		}
	}

	if (cmd.subCommands) {
		const commandNames = []
		const subCommands = await resolveValue(cmd.subCommands)
		for (const [name, sub] of Object.entries(subCommands)) {
			const subCmd = await resolveValue(sub)
			const meta = await resolveValue(subCmd?.meta)
			if (meta?.hidden) {
				continue
			}
			commandsLines.push([`\`${name}\``, meta?.description || ''])
			commandNames.push(name)
		}
		usageLine.push(commandNames.join('|'))
	}

	const usageLines = []

	const version = cmdMeta.version || parentMeta.version

	usageLines.push(
		`${colors.bgMagenta(colors.white(colors.bold(' EsJS ')))} ${colors.magenta(
			`v${version}`,
		)} JavaScript en Español`,
		'',
	)

	usageLines.push(`${cmdMeta.description} (${commandName})`, '')

	const hasOptions = argLines.length > 0 || posLines.length > 0
	usageLines.push(
		`${colors.underline(colors.bold('USO'))} \`${commandName}${
			hasOptions ? ' [OPCIONES]' : ''
		} ${usageLine.join(' ')}\``,
		'',
	)

	if (posLines.length > 0) {
		usageLines.push(colors.underline(colors.bold('ARGUMENTOS')), '')
		usageLines.push(formatLineColumns(posLines, '  '))
		usageLines.push('')
	}

	if (argLines.length > 0) {
		usageLines.push(colors.underline(colors.bold('OPCIONES')), '')
		usageLines.push(formatLineColumns(argLines, '  '))
		usageLines.push('')
	}

	if (commandsLines.length > 0) {
		usageLines.push(colors.underline(colors.bold('COMANDOS')), '')
		usageLines.push(formatLineColumns(commandsLines, '  '))
		usageLines.push(
			'',
			`Escribe \`${commandName} <comando> --ayuda\` para más información sobre un comando.`,
		)
	}

	return usageLines.filter((l) => typeof l === 'string').join('\n')
}

export async function showUsage(cmd, parent) {
	try {
		consola.log(`${await renderUsage(cmd, parent)}
`)
	} catch (error) {
		consola.error(error)
	}
}

export async function runMain(cmd, opts = {}) {
	const rawArgs = opts.rawArgs || process.argv.slice(2)
	try {
		if (rawArgs.includes('--ayuda') || rawArgs.includes('-a')) {
			await showUsage(...(await resolveSubCommand(cmd, rawArgs)))
			process.exit(0)
		} else if (rawArgs.length === 1 && rawArgs[0] === '--version') {
			const meta =
				typeof cmd.meta === 'function' ? await cmd.meta() : await cmd.meta
			if (!meta?.version) {
				throw new CLIError('No version specified', 'E_NO_VERSION')
			}
			consola.log(meta.version)
		} else {
			await runCommand(cmd, { rawArgs })
		}
	} catch (error) {
		const isCLIError = error instanceof CLIError
		if (!isCLIError) {
			consola.error(error, '\n')
		}
		if (isCLIError) {
			await showUsage(...(await resolveSubCommand(cmd, rawArgs)))
		}
		consola.error(error.message)
		process.exit(1)
	}
}
