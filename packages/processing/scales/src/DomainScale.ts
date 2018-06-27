import { CreateScaleArgs, Scales } from '@gog/mark-spec-interfaces'

export abstract class DomainScale<Domain> {
	protected bindDomainValue?: string | string[]
	protected domainValue?: (args: CreateScaleArgs) => Domain
	protected nameValue?: string
	protected tableValue?: string

	public name(value?: string) {
		this.nameValue = value
		return this
	}

	public table(value?: string) {
		this.tableValue = value
		return this
	}

	public bindDomain(value?: string | string[]) {
		this.bindDomainValue = value
		return this
	}

	public domain(value?: (args: CreateScaleArgs) => Domain) {
		this.domainValue = value
		return this
	}

	public build() {
		if (!this.nameValue) {
			throw new Error('scale name must be defined')
		}
		if (!this.tableValue) {
			throw new Error('table name must be defined')
		}
		return (args: CreateScaleArgs) => this.createScale(args)
	}

	protected abstract createScale(args: CreateScaleArgs): Scales

	protected processDomainValues(values: any[]): Domain {
		return (values as any) as Domain
	}

	protected getDomain(args: CreateScaleArgs): Domain {
		if (this.domainValue) {
			return this.domainValue(args)
		} else {
			if (!this.tableValue) {
				throw new Error('table must be defined')
			}
			const bindDomain = this.bindDomainArray
			const data = args.data[this.tableValue] || []
			const domainValues = data.flatMap(d => bindDomain.map(key => d[key]))
			const result = this.processDomainValues(domainValues)
			return result
		}
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
}
