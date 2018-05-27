package linker.controller;

import linker.dto.*
import linker.service.CategoryService
import org.springframework.web.bind.annotation.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 01/05/2018
 * Time: 9:55 PM
 */

@CrossOrigin
@RestController
@RequestMapping("/categories")
class CategoryController(val categoryService: CategoryService) {

    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): CategoryResponse =
            categoryService.findById(id = id)
                    .let { category ->CategoryDto.fromDomain(category) }
                    .let { category -> CategoryResponse(category = category) }

    @GetMapping("/all")
    fun all(): CategoryListResponse =
            categoryService.findAll()
                    .map { category -> CategoryDto.fromDomain(category = category) }.sortedBy { it.order }
                    .let { list -> CategoryListResponse(categories = list) }

    @PostMapping("/")
    fun new(@RequestBody createCategoryCommand: CreateCategoryCommand): CategoryResponse =
            categoryService.newCategory(createCategoryCommand = createCategoryCommand)
                    .let { category ->  CategoryDto.fromDomain(category) }
                    .let { category -> CategoryResponse(category = category) }

    @PostMapping("/reorder")
    fun reorder(@RequestBody categories: List<CategoryDto>): CategoryListResponse =
            categoryService.reorderCategories(categories = categories)
                    .map { category -> CategoryDto.fromDomain(category = category) }
                    .let { list -> CategoryListResponse(categories = list) }

    @PutMapping("/{id}")
    fun update(@RequestBody updateCategoryCommand: UpdateCategoryCommand): CategoryResponse =
            categoryService.updateCategory(updateCategoryCommand = updateCategoryCommand)
                    .let { category -> CategoryDto.fromDomain(category = category) }
                    .let { category -> CategoryResponse(category = category) }

}