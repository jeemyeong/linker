package linker.controller;

import linker.dto.CreateCategoryCommand
import linker.dto.ReorderCategoryCommand
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
    fun new(@RequestBody createCategoryCommand: CreateCategoryCommand) = categoryService.newColumn(createCategoryCommand = createCategoryCommand)

    @PostMapping("/reorder")
    fun reorder(@RequestBody reorderCategoryCommand: ReorderCategoryCommand) = categoryService.reorderColumn(reorderCategoryCommand = reorderCategoryCommand)
}