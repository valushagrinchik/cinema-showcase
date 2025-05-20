import type { CategoriesUpdateDto } from '../api/cinemaShowcaseApi'
import type { ActiveCategory } from '../types'

export function getCategoryDiff(initial: ActiveCategory[], current: ActiveCategory[]) {
    const newCategories = current.filter(c => !c.id)
    const deletedCategories = initial
        .filter(initCat => !current.find(c => c.id === initCat.id))
        .map(c => ({ id: c.id! }))

    const updatedCategories = current
        .filter(c => !!c.id)
        .map(cat => {
            const orig = initial.find(ic => ic.id === cat.id)
            if (!orig) return null
            const deletedSubCategories = orig.subCategories
                .filter(sc => !cat.subCategories.find(s => s.id === sc.id))
                .map(sc => ({ id: sc.id! }))
            const updatedSubCategories = cat.subCategories.filter(sc => !!sc.id)
            const subCategories = cat.subCategories.filter(sc => !sc.id)

            return {
                id: cat.id,
                name: cat.name,
                updatedSubCategories,
                deletedSubCategories,
                subCategories,
            }
        })
        .filter(Boolean)

    return { newCategories, updatedCategories, deletedCategories } as CategoriesUpdateDto
}
