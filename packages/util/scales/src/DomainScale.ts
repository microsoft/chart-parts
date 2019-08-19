/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	ScaleCreationContext,
	Scales,
	ScaleBuilder,
} from '@chart-parts/interfaces'
declare const require: any
const get = require('lodash/get')
export type DomainCreator<Domain> = (args: ScaleCreationContext) => Domain

export abstract class DomainScale<Domain> implements ScaleBuilder {
	protected bindDomainValue?: string
	protected domainValue?: DomainCreator<Domain>
	protected nameValue?: string

	/**
	 * Sets the name of the scale
	 * @param value The name of the scale
	 */
	public name(value?: string) {
		this.nameValue = value
		return this
	}

	/**
	 * Sets the domain of the scale
	 * @param arg The domain argument
	 */
	public domain(arg?: string | DomainCreator<Domain> | Domain) {
		if (typeof arg === 'function') {
			this.domainValue = arg as DomainCreator<Domain>
		} else if (Array.isArray(arg)) {
			this.domainValue = () => arg as Domain
		} else if (arg !== undefined && typeof arg === 'string') {
			this.bindDomainValue = arg as string
		} else {
			this.domainValue = undefined
			this.bindDomainValue = undefined
		}
		return this
	}

	public build = (arg: ScaleCreationContext) => {
		if (!this.nameValue) {
			throw new Error('scale name must be defined')
		}
		return this.createScale(arg)
	}

	protected abstract createScale(args: ScaleCreationContext): Scales

	protected processDomainValues(values: any[]): Domain {
		return (values as any) as Domain
	}

	protected getDomain(args: ScaleCreationContext): Domain {
		if (this.domainValue) {
			return this.domainValue(args)
		} else if (!this.tableBind && !this.fieldBind) {
			// If there's no value and no binding, use a unit-domain
			return ([0, 1] as any) as Domain
		} else {
			return this.getDomainFromTableBinding(args)
		}
	}

	private getDomainFromTableBinding(args: ScaleCreationContext): Domain {
		const table = this.tableBind
		const field = this.fieldBind
		if (!table || !field) {
			throw new Error(
				'Domain scale domain bind must have a table and field accessor name. The expected format is <table>.<field>',
			)
		}
		const data = args.data[table]
		if (!data) {
			throw new Error(`DomainScale could not find source table ${table}`)
		}
		const domainValues = data.map((d: any) => get(d, field))
		const result = this.processDomainValues(domainValues)
		return result
	}

	protected get bindDomainArray(): string[] {
		const bindDomain = this.bindDomainValue
		if (!bindDomain) {
			throw new Error('Either bindDomain or domain must be set')
		}
		return typeof bindDomain === 'string'
			? [bindDomain]
			: (bindDomain as string[])
	}

	private get tableBind(): string | undefined {
		const bind = this.bindDomainValue
		if (!bind) {
			return undefined
		}
		const splitIndex = bind.indexOf('.')
		if (splitIndex === -1) {
			return undefined
		}
		const tableName = bind.slice(0, splitIndex)
		return tableName
	}

	private get fieldBind() {
		const bind = this.bindDomainValue
		if (!bind) {
			return undefined
		}
		const splitIndex = bind.indexOf('.')
		if (splitIndex === -1) {
			return undefined
		}
		const filedName = bind.slice(splitIndex + 1)
		return filedName
	}
}
