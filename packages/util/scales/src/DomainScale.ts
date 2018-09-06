import { ScaleCreationContext, Scales } from '@markable/interfaces'
export type DomainCreator<Domain> = (args: ScaleCreationContext) => Domain

export abstract class DomainScale<Domain> {
	protected bindDomainValue?: string
	protected domainValue?: DomainCreator<Domain>
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

	public domain(arg?: string | DomainCreator<Domain> | Domain) {
		if (typeof arg === 'function') {
			this.domainValue = arg
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

	public build() {
		if (!this.nameValue) {
			throw new Error('scale name must be defined')
		}
		return (args: ScaleCreationContext) => this.createScale(args)
	}

	protected abstract createScale(args: ScaleCreationContext): Scales

	protected processDomainValues(values: any[]): Domain {
		return (values as any) as Domain
	}

	protected getDomain(args: ScaleCreationContext): Domain {
		return this.domainValue
			? this.domainValue(args)
			: this.getDomainFromTableBinding(args)
	}

	private getDomainFromTableBinding(args: ScaleCreationContext): Domain {
		if (!this.tableValue) {
			throw new Error('table must be defined')
		}

		if (!this.bindDomainValue) {
			throw new Error('domain must be defined')
		}
		const bind = this.bindDomainValue
		const data = args.data[this.tableValue] || []
		const domainValues = data.map((d: any) => d[bind])
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
}
