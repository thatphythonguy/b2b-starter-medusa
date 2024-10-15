import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import CategoryBreadcrumb from "../category-breadcrumb"

export default function CategoryTemplate({
  categories,
  currentCategory,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  currentCategory: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!currentCategory || !countryCode) notFound()

  return (
    <div
      className="flex flex-col py-6 content-container gap-4"
      data-testid="category-container"
    >
      <CategoryBreadcrumb category={currentCategory} />
      <div className="flex flex-col small:flex-row small:items-start gap-4">
        <RefinementList
          sortBy={sort}
          categories={categories}
          currentCategory={currentCategory}
          data-testid="sort-by-container"
        />
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={currentCategory.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
