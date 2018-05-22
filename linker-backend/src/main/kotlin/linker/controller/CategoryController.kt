package linker.controller;

import linker.dto.CategoryDto
import linker.dto.CreateCategoryCommand
import linker.dto.UpdateCategoryCommand
import linker.dto.fromDomain
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
    fun getOne(@PathVariable id: Long) = categoryService.findById(id = id)

    @GetMapping("/all")
    fun all() = categoryService.findAll().sortedBy { it.order }

    @PostMapping("/")
    fun new(@RequestBody createCategoryCommand: CreateCategoryCommand) =
            categoryService.newCategory(createCategoryCommand = createCategoryCommand)
                    .let { CategoryDto.fromDomain(it) }

    @PostMapping("/reorder")
    fun reorder(@RequestBody categories: List<CategoryDto>) =
            categoryService.reorderCategories(categories = categories)
                    .map { CategoryDto.fromDomain(it) }

    @PutMapping("/{id}")
    fun update(@RequestBody updateCategoryCommand: UpdateCategoryCommand) =
            categoryService.updateCategory(updateCategoryCommand = updateCategoryCommand)
                    .let { CategoryDto.fromDomain(it) }
}