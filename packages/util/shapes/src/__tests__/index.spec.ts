import { SGAreaItem } from '@markable/interfaces'
import * as shapes from '../index'

describe('The Shape Factories', () => {
	describe('area functions', () => {
		it('can emit an horizontal area', () => {
			const items: SGAreaItem[] = ([
				{ x: 0, y2: 2, y: 10 },
				{ x: 1, y2: 2, y: 20 },
				{ x: 2, y2: 2, y: 30 },
				{ x: 3, y2: 2, y: 40 },
				{ x: 4, y2: 2, y: 50 },
				{ x: 5, y2: 2, y: 60 },
			] as any) as SGAreaItem[]
			const result = shapes.areahShape(items)
			expect(result).toBeDefined() 
		})

		it('can emit a vertical area', () => {
            const items: SGAreaItem[] = ([
				{ y: 0, x2: 2, x: 10 },
				{ y: 1, x2: 2, x: 20 },
				{ y: 2, x2: 2, x: 30 },
				{ y: 3, x2: 2, x: 40 },
				{ y: 4, x2: 2, x: 50 },
				{ y: 5, x2: 2, x: 60 },
			] as any) as SGAreaItem[]
			const result = shapes.areavShape(items)
			expect(result).toBeDefined() 
        })
	})
})
