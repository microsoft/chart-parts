/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FieldAccessor, TextCaseTransform } from '../interfaces'
import { DatasetTransform } from './interfaces'

declare const require: any
const { countpattern: vegaCountPattern } = require('vega-transforms')
const { field: vegaField } = require('vega-util')

export interface CountPatternBuilder extends DatasetTransform {
	/**
	 * Required. The data field containing the text data.
	 * @param value
	 */
	field(value: FieldAccessor): CountPatternBuilder

	/**
	 * A string containing a well-formatted regular expression, defining a
	 * pattern to match in the text. All unique pattern matches will be
	 * separately counted. The default value is [\\w\']+, which will match
	 * sequences containing word characters and apostrophes, but no other
	 *  characters.
	 * @param value
	 */
	pattern(value: string): CountPatternBuilder

	/**
	 * A lower- or upper-case transformation to apply prior to pattern
	 * matching. One of lower, upper or mixed (the default).
	 * @param value
	 */
	case(value: TextCaseTransform): CountPatternBuilder

	/**
	 * A string containing a well-formatted regular expression, defining
	 * a pattern of text to ignore. For example, the value "(foo|bar|baz)"
	 * will treat the words "foo", "bar" and "baz" as stopwords that should be
	 * ignored. The default value is the empty string (""), indicating no stop
	 * words.
	 *
	 * @param value
	 */
	stopWords(value: string): CountPatternBuilder

	/**
	 * The output fields for the text pattern and occurrence count.
	 * The default is ["text", "count"].
	 *
	 * @param textField Matched text pattern field
	 * @param countField Occurrence count
	 */
	as(textField: string, countField: string): CountPatternBuilder
}

export class CountPatternBuilderImpl implements CountPatternBuilder {
	private fieldValue: FieldAccessor | undefined
	private patternValue: string | undefined
	private caseValue: TextCaseTransform | undefined
	private stopWordsValue: string | undefined
	private asValue: [string, string] | undefined

	public field(value: FieldAccessor) {
		this.fieldValue = value
		return this
	}

	public pattern(value: string) {
		this.patternValue = value
		return this
	}

	public case(value: TextCaseTransform) {
		this.caseValue = value
		return this
	}

	public stopWords(value: string) {
		this.stopWordsValue = value
		return this
	}

	public as(textField: string, countField: string) {
		this.asValue = [textField, countField]
		return this
	}

	public build(df: any, from: any) {
		if (!this.fieldValue) {
			throw new Error('countPattern field() must be defined')
		}

		const spec: any = {
			field: vegaField(this.fieldValue),
			pulse: from,
		}

		if (this.caseValue) {
			spec.case = this.caseValue
		}
		if (this.patternValue) {
			spec.pattern = this.patternValue
		}
		if (this.stopWordsValue) {
			spec.stopwords = this.stopWordsValue
		}
		if (this.asValue) {
			spec.as = this.asValue
		}

		const countPatternNode = df.add(vegaCountPattern, spec)
		return countPatternNode
	}
}

export function countPattern(fieldValue: FieldAccessor) {
	return new CountPatternBuilderImpl().field(fieldValue)
}
