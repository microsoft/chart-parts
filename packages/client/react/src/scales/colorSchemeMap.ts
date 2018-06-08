import {
	schemeCategory10,
	schemeAccent,
	schemeDark2,
	schemePaired,
	schemePastel1,
	schemePastel2,
	schemeSet1,
	schemeSet2,
	schemeSet3,
} from 'd3-scale-chromatic'
import { CategoricalColorScheme } from '../interfaces'

export const colorSchemeMap = new Map<CategoricalColorScheme, any>()
colorSchemeMap.set(CategoricalColorScheme.category10, schemeCategory10)
colorSchemeMap.set(CategoricalColorScheme.accent, schemeAccent)
colorSchemeMap.set(CategoricalColorScheme.dark2, schemeDark2)
colorSchemeMap.set(CategoricalColorScheme.paired, schemePaired)
colorSchemeMap.set(CategoricalColorScheme.pastel, schemePastel1)
colorSchemeMap.set(CategoricalColorScheme.pastel2, schemePastel2)
colorSchemeMap.set(CategoricalColorScheme.set1, schemeSet1)
colorSchemeMap.set(CategoricalColorScheme.set2, schemeSet2)
colorSchemeMap.set(CategoricalColorScheme.set3, schemeSet3)
